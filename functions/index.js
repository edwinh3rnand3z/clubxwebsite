import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

const auth = getAuth();
const db = getFirestore();

function assertSuperAdmin(request) {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in.");
  }

  if (request.auth.token.superAdmin !== true) {
    throw new HttpsError("permission-denied", "Only the super admin can do this.");
  }
}

export const createStaffUser = onCall(async (request) => {
  assertSuperAdmin(request);

  const { fullName, username, email, password, role } = request.data;

  if (!fullName || !username || !email || !password || !role) {
    throw new HttpsError("invalid-argument", "Missing required fields.");
  }

  if (!["user", "admin"].includes(role)) {
    throw new HttpsError("invalid-argument", "Invalid role.");
  }

  const userRecord = await auth.createUser({
    email,
    password,
    displayName: fullName
  });

  const claims =
    role === "admin"
      ? { admin: true, superAdmin: false, role: "admin" }
      : { admin: false, superAdmin: false, role: "user" };

  await auth.setCustomUserClaims(userRecord.uid, claims);

  await db.collection("users").doc(userRecord.uid).set({
    fullName,
    username,
    email,
    role,
    active: true,
    createdBy: request.auth.uid,
    createdAt: new Date().toISOString()
  });

  return {
    message: `Created ${role} account for ${username}`,
    uid: userRecord.uid
  };
});

export const setUserRole = onCall(async (request) => {
  assertSuperAdmin(request);

  const { uid, role } = request.data;

  if (!uid || !role) {
    throw new HttpsError("invalid-argument", "Missing uid or role.");
  }

  if (!["user", "admin", "superAdmin"].includes(role)) {
    throw new HttpsError("invalid-argument", "Invalid role.");
  }

  const claims =
    role === "superAdmin"
      ? { admin: true, superAdmin: true, role: "superAdmin" }
      : role === "admin"
        ? { admin: true, superAdmin: false, role: "admin" }
        : { admin: false, superAdmin: false, role: "user" };

  await auth.setCustomUserClaims(uid, claims);
  await db.collection("users").doc(uid).update({ role });

  return { message: `Updated role to ${role}` };
});
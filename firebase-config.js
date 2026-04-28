import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getFunctions,
    httpsCallable
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDNZB64SpHhkb1PuwqudgnJpygY4ltH7oM",
    authDomain: "officialclub-x.firebaseapp.com",
    projectId: "officialclub-x",
    storageBucket: "officialclub-x.firebasestorage.app",
    messagingSenderId: "1066159341532",
    appId: "1:1066159341532:web:e3bcbf2ab51871ed6d5919"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app);

export {
    auth,
    db,
    functions,
    storage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
    httpsCallable,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
};

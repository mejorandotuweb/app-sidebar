import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAuth
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOdA1v0UlzEhCMp9fyOC581aF8CWr1SKU",
  authDomain: "comunidadmejorando.firebaseapp.com",
  projectId: "comunidadmejorando",
  storageBucket: "comunidadmejorando.appspot.com",
  messagingSenderId: "213366499035",
  appId: "1:213366499035:web:b6b21c4602d22a2f110efe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
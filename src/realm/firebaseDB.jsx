import { initializeApp } from "firebase/app";

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
const db = getFirestore(app);


export default db;
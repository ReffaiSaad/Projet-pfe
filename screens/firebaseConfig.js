import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQC-ScTUjBq2Oid0DxOwmne5yEACng1P8",
  authDomain: "applocalisation-a2e3e.firebaseapp.com",
  projectId: "applocalisation-a2e3e",
  storageBucket: "applocalisation-a2e3e.appspot.com",
  messagingSenderId: "716450068076",
  appId: "1:716450068076:web:20b8d5db154688e3804a49",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

export { db };

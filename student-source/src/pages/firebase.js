import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBExYha9Ra7e5efC1j0BiW-aawIwXEATSw",
  authDomain: "student-resource-1364c.firebaseapp.com",
  projectId: "student-resource-1364c",
  storageBucket: "student-resource-1364c.firebasestorage.app",
  messagingSenderId: "997135032602",
  appId: "1:997135032602:web:f1eb5435cc0b8834d1cca3"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwg2HBsCWjt_Ai-0GhybYOlqWOmvQWhAQ",
  authDomain: "studio-portfolio-2efdd.firebaseapp.com",
  projectId: "studio-portfolio-2efdd",
  storageBucket: "studio-portfolio-2efdd.appspot.com",
  messagingSenderId: "466065808930",
  appId: "1:466065808930:web:ce17cc4dfb̥̥f37b05cff47b",
  measurementId: "G-45YJ9SY2SF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

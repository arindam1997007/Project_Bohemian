import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "infatuation-c13ec.firebaseapp.com",
  projectId: "infatuation-c13ec",
  storageBucket: "infatuation-c13ec.appspot.com",
  messagingSenderId: "442845529539",
  appId: "1:442845529539:web:14b161db523786bf09a976",
  measurementId: "G-0QTV2WTJ6J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

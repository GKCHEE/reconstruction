import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  // Other fields aren't strictly necessary for just Firestore access, 
  // but usually include storageBucket, messagingSenderId, appId if available.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

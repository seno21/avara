import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFAb0DeEd4ssS0sRNsawq8a9EnVP5A_q8",
  authDomain: "avara-studio-100.firebaseapp.com",
  projectId: "avara-studio-100",
  storageBucket: "avara-studio-100.firebasestorage.app",
  messagingSenderId: "466060502859",
  appId: "1:466060502859:web:dbde257a03076b307baace",
  measurementId: "G-HLP8PX00NN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export let analytics: unknown = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

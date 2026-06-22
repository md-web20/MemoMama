import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfin7n-J7ryzZmxmIdOVNc_j-08_M-S_4",
  authDomain: "memomama-ebf09.firebaseapp.com",
  projectId: "memomama-ebf09",
  storageBucket: "memomama-ebf09.firebasestorage.app",
  messagingSenderId: "885805263641",
  appId: "1:885805263641:web:6223a9d6fac397d127b388",
  measurementId: "G-R7RYCZRF7K"
};

// ফায়ারবেস ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ1RbiaNIScBD5UW4nBmYPGCqcjccDqbg",
  authDomain: "hediybega.firebaseapp.com",
  projectId: "hediybega",
  storageBucket: "hediybega.firebasestorage.app",
  messagingSenderId: "744630067291",
  appId: "1:744630067291:web:3cf300d45778fb70891f7e",
  measurementId: "G-4Y58EBGTJ4",
  databaseURL: "https://hediybega-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
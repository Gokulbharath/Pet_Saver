import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCePSeV6jlHLxDpo_djdROpXWb6qhD-GoQ",
  authDomain: "petsaver-216ae.firebaseapp.com",
  projectId: "petsaver-216ae",
  storageBucket: "petsaver-216ae.firebasestorage.app",
  messagingSenderId: "904489110679",
  appId: "1:904489110679:web:d6f8fefb00a53c4e6cadd2",
  measurementId: "G-LG1Y6R6BF3"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);

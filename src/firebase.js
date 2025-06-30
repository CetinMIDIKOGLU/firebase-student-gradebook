// Firebase modüllerini import et
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Aşağıdaki firebaseConfig alanını Firebase Console'daki
// "Project Settings > General sekmesinde yer alan
// "Firebase SDK snippet" (config) bölümünden alınan bilgilerle doldurun.
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 
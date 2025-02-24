import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD2fb83WkW43WeioJxLJu8naYyqtKn4B1E",
  authDomain: "reptiletrackeriank.firebaseapp.com",
  databaseURL: "https://reptiletrackeriank-default-rtdb.firebaseio.com",
  projectId: "reptiletrackeriank",
  storageBucket: "reptiletrackeriank.firebasestorage.app",
  messagingSenderId: "634542793122",
  appId: "1:634542793122:web:d716566486e8219fa312fb",
  measurementId: "G-32JFGMS400",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

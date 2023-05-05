// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0GP6dWPLbh41h8SL402ZN8Z4tkYsNfns",
  authDomain: "budgets-management-d2ac2.firebaseapp.com",
  projectId: "budgets-management-d2ac2",
  storageBucket: "budgets-management-d2ac2.appspot.com",
  messagingSenderId: "279832057834",
  appId: "1:279832057834:web:1a440bed188f2295ec4493"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const DB = getFirestore(app, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
})
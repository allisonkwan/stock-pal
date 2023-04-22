// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiwf5rXlRqiucy1rGwVgYKp8539r8QSb0",
  authDomain: "trader-joes-4ebde.firebaseapp.com",
  projectId: "trader-joes-4ebde",
  storageBucket: "trader-joes-4ebde.appspot.com",
  messagingSenderId: "175521391445",
  appId: "1:175521391445:web:676945354dafa42304c5dc"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth()
const db = getDatabase();

export { auth, db };
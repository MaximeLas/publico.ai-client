// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx7WvdpIlqcLbFN1cEkYaOJJynsAm65rE",
  authDomain: "demoauth-cfd7f.firebaseapp.com",
  projectId: "demoauth-cfd7f",
  storageBucket: "demoauth-cfd7f.appspot.com",
  messagingSenderId: "564390557009",
  appId: "1:564390557009:web:5c4f0d300946179b578f70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }
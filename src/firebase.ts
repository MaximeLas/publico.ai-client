// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHrE5orvmeVRDmVF11GytKuxhowRnvi5Y",
  authDomain: "publico-ai.firebaseapp.com",
  projectId: "publico-ai",
  storageBucket: "publico-ai.appspot.com",
  messagingSenderId: "939990736039",
  appId: "1:939990736039:web:f0bc501e8a0f1a35920f82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }
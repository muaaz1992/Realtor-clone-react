// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlmJ2Mapylh3IQF-ZXyxBqDALqHDl5Yw0",
  authDomain: "realtor-clone-react-6ce39.firebaseapp.com",
  projectId: "realtor-clone-react-6ce39",
  storageBucket: "realtor-clone-react-6ce39.appspot.com",
  messagingSenderId: "24113631793",
  appId: "1:24113631793:web:1f57de86037355770b7b10"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-ecommerce-d1415.firebaseapp.com",
  projectId: "mern-ecommerce-d1415",
  storageBucket: "mern-ecommerce-d1415.appspot.com",
  messagingSenderId: "280585692761",
  appId: "1:280585692761:web:f5ef94db20df37a792b348"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-4J9_TOTzIsHhxWTbSo5JWnOAosN3r84",
  authDomain: "realtor-clone-react-13577.firebaseapp.com",
  projectId: "realtor-clone-react-13577",
  storageBucket: "realtor-clone-react-13577.firebasestorage.app",
  messagingSenderId: "534994441239",
  appId: "1:534994441239:web:517d111465c4d23ee83852",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

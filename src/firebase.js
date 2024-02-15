// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { isSupported, initializeAnalytics } from "@firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDMbwSXXc1qtNnarqVHXMTanR_NfHvCwM0",
  authDomain: "nextfirstproject-a2df4.firebaseapp.com",
  projectId: "nextfirstproject-a2df4",
  storageBucket: "nextfirstproject-a2df4.appspot.com",
  messagingSenderId: "922972127866",
  appId: "1:922972127866:web:e3897b298b32ab099831c3",
  measurementId: "G-HDQJGJ6F9G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

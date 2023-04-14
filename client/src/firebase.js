// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVlq_qRzFxxTW0_Tk_Sm7jzR6hsF3W68k",
  authDomain: "profile-picture-54580.firebaseapp.com",
  projectId: "profile-picture-54580",
  storageBucket: "profile-picture-54580.appspot.com",
  messagingSenderId: "911616387361",
  appId: "1:911616387361:web:d7dd6ab63a651c523e3660",
  measurementId: "G-WMC3FSRT92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
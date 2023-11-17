// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOtb7_I3DuqpiIXeTVLG-rqmIyYNlw_hQ",
    authDomain: "book-12ba0.firebaseapp.com",
    projectId: "book-12ba0",
    storageBucket: "book-12ba0.appspot.com",
    messagingSenderId: "592812554883",
    appId: "1:592812554883:web:ff051632bb295881b179b6",
    measurementId: "G-BTJSFLSYHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
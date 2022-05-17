
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYt6jw3u5pByavClrnwcotl4H3cKOmbD4",
    authDomain: "my-project-admirapp.firebaseapp.com",
    databaseURL: "https://my-project-admirapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-project-admirapp",
    storageBucket: "my-project-admirapp.appspot.com",
    messagingSenderId: "145034728148",
    appId: "1:145034728148:web:b95da7ca368b39bd6e6141",
    measurementId: "G-LK7TS4YB97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const database = getDatabase(app);

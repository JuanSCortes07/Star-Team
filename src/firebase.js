import firebase from "firebase/app";
import "firebase/storage"
import "firebase/firestore"
import "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiRIcFg2PuJfM_cuvUGch90npUXcRC4I8",
    authDomain: "star-team-19.firebaseapp.com",
    projectId: "star-team-19",
    storageBucket: "star-team-19.appspot.com",
    messagingSenderId: "704317334740",
    appId: "1:704317334740:web:b5fcbfd7b5648e5ea20741",
    measurementId: "G-DLMEKX6YJH"
};

const fb = firebase.initializeApp(firebaseConfig);

export const storage = fb.storage();
export const db = fb.firestore();
export const auth = fb.auth();
export default firebaseConfig;

import firebase from "firebase/app";
import "firebase/auth";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfigProd = {
    apiKey: "AIzaSyBLqYM_fxGMP-pm_0V0RvU7V-M3ou3cVHY",
    authDomain: "let-it-flow.firebaseapp.com",
    projectId: "let-it-flow",
    storageBucket: "let-it-flow.appspot.com",
    messagingSenderId: "851488351041",
    appId: "1:851488351041:web:1ccee2bc795e54015577c0",
    measurementId: "G-69N4TGJJH9"
  };

  const firebaseConfigDev = {
    apiKey: "AIzaSyBF7riEBO7WoEfT0XoVd0qv1su7ltX1Prc",
    authDomain: "let-it-flow-dev.firebaseapp.com",
    projectId: "let-it-flow-dev",
    storageBucket: "let-it-flow-dev.appspot.com",
    messagingSenderId: "984789437335",
    appId: "1:984789437335:web:71e748e92a561c9ae0d2d2",
    measurementId: "G-FSZY45P4GG"
  }


// Initialize Firebase
const firebase_app = firebase.initializeApp(process.env.NODE_ENV === 'production' ? firebaseConfigProd:firebaseConfigDev); 
export default firebase_app
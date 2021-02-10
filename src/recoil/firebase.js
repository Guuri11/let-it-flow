import { atom } from "recoil";
import firebase from '../utils/firebase';
import "firebase/firestore";

export const db_app = atom({
    key: "db",
    default: firebase.firestore(firebase)
})

export const firebase_app = atom({
    key: "firebase",
    default: firebase
})
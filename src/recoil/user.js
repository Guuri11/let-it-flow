import { atom, selector } from "recoil";
import "firebase/auth";
import firebase from '../utils/firebase';
import { db_app } from "./firebase";

export const user_app = atom({
    key: "user",
    default: undefined
})

export const logout_app = atom({
    key: "logout",
    default: () => {
        firebase.auth().signOut()
    }
})

export const name_app = selector({
    key: "name",
    get: async ({get}) => {
        const user = get(user_app)
        if (user ) {
            const db = get(db_app)

            const result = await db.collection("users").where("user","==", user.uid).get()

            let name = ""
            result.forEach(doc => {
                name = doc.data().name
            })
            return name
        } else return ""
    }
})
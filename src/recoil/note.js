import { atom, selectorFamily } from "recoil";
import { db_app } from "./firebase";
import { user_app } from "./user";

export const notes_app = atom({
    key: 'notes',
    default: [],
})

export const note_app = selectorFamily({
    key: 'note',
    get: (id) => async ({get}) => {
        const notes = get(notes_app)
        let note = notes.filter(note => note.id === id)

        if ( !notes.length > 0 ) {
            const db = get(db_app)
            const user = get(user_app)

            const result = await  db.collection("notes").where("user","==", user.uid).where("id","==", id).get()
            result.forEach(doc => {
                note = doc.data();
            });
                
        }

        return note;
    }
})
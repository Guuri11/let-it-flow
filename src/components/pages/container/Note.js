import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { db_app } from '../../../recoil/firebase'
import { notes_app } from '../../../recoil/note'
import { user_app } from '../../../recoil/user'
import NotePresentational from '../presentational/Note'

export default function Note() {

    const [fromFirebase, setFromFirebase] = useState(false)
    const [note, setNote] = useState(undefined)
    const { id } = useParams()
    const db = useRecoilValue(db_app)
    const notes = useRecoilValue(notes_app)
    const user = useRecoilValue(user_app)

    // fetch note
    useEffect(() => {
        if (fromFirebase) {
            db.collection("notes").where("user","==", user.uid).get().then(res => {
                let notes_arr = []
                res.forEach(doc => {
                    notes_arr.push({name: doc.data().name, description: doc.data().description, id: doc.id, favorite: doc.data().favorite})
                })
                setNote(notes_arr.filter(note => note.id === id)[0])
            })
        } else {
            setNote(notes.filter(note => note.id === id)[0])
            if(!note) setFromFirebase(true)
        }
    }, [fromFirebase]);

    
    return <NotePresentational 
    note={note} 
    />
    
}

import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ProfilePresentational from "../presentational/Profile"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user_app, name_app, logout_app } from '../../../recoil/user';
import { db_app } from '../../../recoil/firebase';
import { voice_supported_app } from '../../../recoil/voice';
import { notes_app, note_description_app, note_name_app } from '../../../recoil/note';


export default function Profile() {

    // recoil
    const [notes, setNotes] = useRecoilState(notes_app)
    const [note_name, setNoteName] = useRecoilState(note_name_app)
    const [note_description, setNoteDescription] = useRecoilState(note_description_app)
    const db = useRecoilValue(db_app)
    const name = useRecoilValue(name_app)
    const user = useRecoilValue(user_app)
    const voice_supported = useRecoilValue(voice_supported_app)
    const logout = useRecoilValue(logout_app)

    // states
    const [error, setError] = useState({})
    const [is_listening, setIsListening] = useState(false)
    const [loading, setLoading] = useState(true)
    const [note, setNote] = useState({})
    const [reAnimate, setReAnimate] = useState(true)
    const [reload, setReload] = useState(false)
    const [visible_show, setVisibleShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)



    useEffect(() => {
        // if user exists get all his/her notes & name
        if (user) {
            db.collection("notes").where("user","==", user.uid).get().then(res => {
                let notes_arr = []
                res.forEach(doc => {
                    notes_arr.push({name: doc.data().name, description: doc.data().description, id: doc.id, favorite: doc.data().favorite})
                })
                notes_arr = notes_arr.sort((a,b)=>a.favorite ? -1:b.favorite ? 1:0)
                setNotes(notes_arr)
                setLoading(false)
                setReAnimate(true)
            })
        }
    },[reload, user, db, setNotes])

    /**
     * Change name state 
     */
    const handleChangeNoteName = e => {
        setNoteName(e.value)
    }

    /**
     * Change description state
     */
    const handleChangeNoteDescription = e => {
        setNoteDescription(e.value)
    }

    /**
     * Add a note to database
     */
    const handleNewNote = e => {
        e.preventDefault()
        const note_aux = { name: note_name, description: note_description, user: user.uid }
        if (Object.keys(note).length === 0) {
            db.collection("notes").add(note_aux).then(r => {
                setVisible(false)
                setLoading(true)
                setReload(!reload)
            }).catch(()=>setError({error_edit: true}))
        }
        else {
            db.collection("notes").doc(note.id).update(note_aux).then(()=>{
                setVisible(false)
                setLoading(true)
                setReload(!reload)
            }).catch(()=>setError({error_edit: true}))
        }
        
    }

    const handleFav = (note) => {
        let note_aux = Object.assign({}, note);
        note_aux.favorite = note.favorite  ? false : true
        db.collection("notes").doc(note.id).update(note_aux).then(()=>{
            setLoading(true)
            setReload(!reload)
        }).catch(e=>console.log(e))        
    } 


    /**
     * Delete a note 
     */
    const handleDeleteNote = (id) => {
        db.collection("notes").doc(id).delete().then(setReload(!reload)).catch(()=>setError({error_delete: true}))
    }

    /**
     * Open dialog to created a note
     */
    const openNew = () => {
        setNote({})
        setVisible(true)
        setNoteName("")
        setNoteDescription("")
        if (reAnimate) setReAnimate(false)
    }

    /**
     * Open note dialog to edit 
     */
    const openNote = (note) => {
        setNote(note)
        setVisible(true)
        setNoteName(note.name)
        setNoteDescription(note.description)
        if (reAnimate) setReAnimate(false)
    }

    /**
     * Open note dialog to show 
     */
    const showNote = (note) => {
        setNote(note)
        setVisibleShow(true)
        setNoteName(note.name)
        setNoteDescription(note.description)
        if (reAnimate) setReAnimate(false)
    }

    /**
     * Open delete form dialog
     */
    const openDelete = (note) => {
        setNote(note)
        if (reAnimate) setReAnimate(false)
        setVisibleDelete(true)
    }

    /**
     * Search notes by name and description cheking if the query is included
     */
    const handleSearch = (e) => {
        if (e.value !== "") {
            let result = [] 
            notes.map(note => {
                if (note.name.toLowerCase().includes(e.value.toLowerCase()) || note.description.toLowerCase().includes(e.value.toLowerCase())) {
                    result.push(note)
                }
            })
            setNotes(result)
        } else {
            setReload(!reload)
        }
        
    }

    /**
     * Voice control setup
     */
    const commands = [          
        {
            command: 'crea una nota',         
            callback: ()=> {
                openNew()
                setIsListening(false)
            }
        },
        {
            command: 'borra *',         
            callback: (note_named) => {
                notes.map(note => {
                    if (note.name.toLowerCase().includes(note_named.toLowerCase())) {
                        openDelete(note)
                    }
                })
                setIsListening(false)
                setReload(!reload)
            }
        },
        {
            command: 'edita *',         
            callback: (note_named) => {
                notes.map(note => {
                    if (note.name.toLowerCase().includes(note_named.toLowerCase())) {
                        openNote(note)
                    }
                })
                setIsListening(false)
            }
        },
        {
            command: 'busca *',         
            callback: (search) => {
                handleSearch({value: search})
                setIsListening(false)
            }
        },
        {
            command: 'limpia',         
            callback: () => {
                handleSearch({value: ""})
                setIsListening(false)
            }
        },
        {
            command: 'salir',         
            callback: logout
        }
    ]
    
    useSpeechRecognition({commands})

    if (!user) 
        return <Redirect to="/login"/>

    return (
        <ProfilePresentational 
        error={error}
        handleChangeNoteDescription={handleChangeNoteDescription} 
        handleChangeNoteName={handleChangeNoteName}
        handleDelete={handleDeleteNote}
        handleFav={handleFav}
        handleNewNote={handleNewNote} 
        handleSearch={handleSearch}
        is_listening={is_listening} 
        loading={loading} 
        name={name} 
        note={note}
        notes={notes} 
        openDelete={openDelete}
        openNew={openNew}
        openNote={openNote}
        setIsListening={setIsListening}
        setVisible={setVisible}
        setVisibleDelete={setVisibleDelete}
        setVisibleShow={setVisibleShow}
        showNote={showNote}
        SpeechRecognition={SpeechRecognition}
        visible_show={visible_show}
        visible={visible} 
        visibleDelete={visibleDelete} 
        voice_supported={voice_supported}
        />
        )
}

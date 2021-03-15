import React from 'react'
import NotePresentational from '../presentational/Note'

export default function Note(props) {

    const { openNote, note, openDelete, idx, handleFav, delay } = props

    return (
        <NotePresentational 
        delay={delay} 
        handleFav={handleFav} 
        idx={idx} 
        note={note} 
        openDelete={openDelete} 
        openNote={openNote} 
        />
    )
}

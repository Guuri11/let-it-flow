import React from 'react'
import NotePresentational from '../presentational/Note'

export default function Note(props) {

    const { openNote, note, openDelete, idx, handleFav, delay } = props

    return (
        <NotePresentational delay={delay} openNote={openNote} handleFav={handleFav} note={note} openDelete={openDelete} idx={idx} />
    )
}

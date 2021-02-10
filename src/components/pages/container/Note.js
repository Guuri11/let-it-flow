import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { note_app } from '../../../recoil/note'

export default function Note() {

    const { id } = useParams()
    const note = useRecoilValue(note_app(id))
    
    // TODO: desde el selector filtrar todas las notas y sacar la que tenga el id
    // si no se encuentra buscar en firebase
    // sino redirigir a la página de inicio

    return (
        <div>
            
        </div>
    )
}

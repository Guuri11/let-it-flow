import React, { useState } from 'react'
import MenuPresentational from '../presentational/Menu'

export default function Menu() {

    const [toggled, setToggled] = useState(true)

    return (
        <MenuPresentational toggled={toggled} />
    )
}

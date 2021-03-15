import { mdiFileEdit, mdiNotebook } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from 'ui-neumorphism'

export default function Menu(props) {

    const { toggled } = props

    return (
        <div id="wrapper" className={toggled ? 'toggled':''}>
            <aside id="sidebar-wrapper">
                <div class="sidebar-brand">
                    <h2>Logo</h2>
                </div>
                <ul class="sidebar-nav">
                    <li class="active">
                        <Link to="/"><IconButton text={false} ><Icon size={1} path={mdiNotebook} /></IconButton>  Home</Link>
                    </li>
                    <li>
                        <Link to="/markdown-guide" ><IconButton text={false} ><Icon size={1} path={mdiFileEdit} /></IconButton>  MD Guide</Link>
                    </li>
                </ul>
            </aside>
        </div>
       
    )
}

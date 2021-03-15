import React from 'react'
import { IconButton, Tooltip } from 'ui-neumorphism'
import Icon from '@mdi/react';
import { mdiLogout, mdiThemeLightDark, mdiArrowLeftThick } from "@mdi/js"
import { Link } from 'react-router-dom';


export default function Header(props) {

    const { logout, handleSwitchTheme, goBack } = props

    return (
        <div className="row py-4 px-2">
			{
				goBack ?
				<div className="col-2">
					<Link to={'/'}>
						<IconButton>
							<Icon path={mdiArrowLeftThick} size={2}></Icon>
						</IconButton>
					</Link>
				</div>
				:
				null
			}
			<div className={goBack ? "offset-2 col-8" : "offset-6 col-6"}>
				<IconButton rounded className="float-right" text={false} onClick={ logout }>
					<Icon path={mdiLogout} size={1}></Icon>
				</IconButton>
				<IconButton className="float-right mr-1" onClick={handleSwitchTheme} rounded> 
					<Icon path={mdiThemeLightDark} size={1} />
				</IconButton>
			</div>
		</div>
    )
}

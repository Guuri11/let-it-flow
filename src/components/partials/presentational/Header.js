import React from 'react'
import { IconButton, Switch } from 'ui-neumorphism'
import Icon from '@mdi/react';
import { mdiLogout, mdiThemeLightDark } from "@mdi/js"


export default function Header(props) {

    const { logout, handleSwitchTheme, is_dark_mode } = props

    return (
        <div className="row px-4">
			<div className="offset-sm-6 offset-xs-4 col-sm-6 col-xs-8">
				<IconButton rounded className="float-right" text={false} onClick={ logout }>
					<Icon path={mdiLogout} size={1}></Icon>
				</IconButton>
				<Switch checked={is_dark_mode} label={<Icon path={mdiThemeLightDark} size={1} />} onChange={handleSwitchTheme} className="float-right" color='var(--primary)' />
			</div>
		</div>
    )
}

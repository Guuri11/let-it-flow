import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { switch_theme_app, dark_mode } from '../../../recoil/darkmode'
import { logout_app } from '../../../recoil/user'
import HeaderPresentational from '../presentational/Header'


export default function Header(props) {

    const switchTheme = useRecoilValue(switch_theme_app)
    const logout = useRecoilValue(logout_app)
    const is_dark_mode = useRecoilValue(dark_mode)
    const [checked, setChecked] = useState(false)
    const { goBack } = props

    /**
     * 
     * @param {checkbox event to switch theme} e 
     */
    const handleSwitchTheme = () => {
        switchTheme(!checked)
        setChecked(!checked)
    }

    return (
        <HeaderPresentational goBack={goBack !== undefined ? goBack:false} checked={checked} setChecked={setChecked} handleSwitchTheme={handleSwitchTheme} logout={logout} is_dark_mode={is_dark_mode} />
    )
}

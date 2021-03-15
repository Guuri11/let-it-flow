import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { switch_theme_app, dark_mode } from '../../../recoil/darkmode'
import { logout_app } from '../../../recoil/user'
import HeaderPresentational from '../presentational/Header'


export default function Header(props) {

    const [checked, setChecked] = useState(false)
    const { goBack } = props
    const is_dark_mode = useRecoilValue(dark_mode)
    const logout = useRecoilValue(logout_app)
    const switchTheme = useRecoilValue(switch_theme_app)

    /**
     * 
     * @param {checkbox event to switch theme} e 
     */
    const handleSwitchTheme = () => {
        switchTheme(!checked)
        setChecked(!checked)
    }

    return (
        <HeaderPresentational 
        checked={checked}
        goBack={goBack !== undefined ? goBack:false} 
        handleSwitchTheme={handleSwitchTheme} 
        is_dark_mode={is_dark_mode}
        logout={logout} 
        setChecked={setChecked}
         />
    )
}

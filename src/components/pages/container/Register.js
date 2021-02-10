import React, { useState } from 'react'
import RegisterPresentational from "../presentational/Register"
import {validateEmail} from "../../../utils/validateEmail"
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {firebase_app, db_app} from '../../../recoil/firebase';

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [submited, setSubmited] = useState(false)
    const history = useHistory();
    const firebase = useRecoilValue(firebase_app)
    const db = useRecoilValue(db_app)

    const handleChangeEmail = e => {
        setEmail(e.value)
    }

    const handleChangeName = e => {
        setName(e.value)
    }

    const handleChangePassword = e => {
        setPassword(e.value)
    }

    const handleChangeConfirmPassword = e => {
        setConfirmPassword(e.value)
    }

    const handleSubmit = () => {

        setErrors({});

        let formErrors = {}

        if (email === "") formErrors = {...formErrors, email_empty: true}
        if (name === "") formErrors = {...formErrors, name_empty: true}
        if (password === "") formErrors = {...formErrors, password_empty: true}
        if (confirmPassword === "") formErrors = {...formErrors, confirm_password_empty: true}

        if (!validateEmail(email)) formErrors = { ...formErrors, email_not_valid: true }
        if (password.length < 6) formErrors = { ...formErrors, password_not_valid: true }
        if (confirmPassword !== password) formErrors = { ...formErrors, confirm_password_not_valid: true }

        setErrors(formErrors)
        setSubmited(true)

        // no errors, register user
        if (Object.keys(formErrors).length === 0 ) {
            
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(r => {
                const user = r.user
                db.collection("users").add({name: name, user: user.uid}).then( r => {
                    history.push("/");
                } ).catch(console.log())
            }).catch(e => setErrors({...setErrors, error_firebase: e.message}))
            
        }

    }

    return (
        <RegisterPresentational handleChangePassword={ handleChangePassword } handleChangeEmail={handleChangeEmail}
        handleChangeConfirmPassword={ handleChangeConfirmPassword } handleSubmit={handleSubmit} name={name} 
        handleChangeName={ handleChangeName } errors={errors} submited={submited} />
    )
}

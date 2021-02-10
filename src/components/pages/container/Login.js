import React, {useState} from 'react'
import LoginPresentational from "../presentational/Login"
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {firebase_app} from '../../../recoil/firebase';

export default function Login() {

    const firebase = useRecoilValue(firebase_app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [submited, setSubmited] = useState(false)
    const history = useHistory();

    const handleChangeEmail = e => {
        setSubmited(false)
        setEmail(e.value)
    }

    const handleChangePassword = e => {
        setSubmited(false)
        setPassword(e.value)
    }

    const handleSubmit = () => {

        setErrors({});

        let formErrors = {}

        if (email === "") formErrors = {...formErrors, email_empty: true}
        if (password === "") formErrors = {...formErrors, password_empty: true}

        setErrors(formErrors)
        // no errors, login user
        if (Object.keys(formErrors).length === 0 ) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
                history.push("/");
            })
            .catch(e=> {
                if(e.code === "auth/wrong-password") formErrors = { ...formErrors, password_not_valid: true }
                if(e.code === "auth/user-not-found") formErrors = { ...formErrors, email_not_valid: true }
                setErrors(formErrors)
            })
        }
        setSubmited(true)
    }

    return (
        <LoginPresentational handleChangePassword={ handleChangePassword } handleChangeEmail={handleChangeEmail}  
        handleSubmit={handleSubmit} errors={errors} submited={submited}/>
    )
}

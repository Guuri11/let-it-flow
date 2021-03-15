import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { Body1, Body2, Button, Caption, Card, CardContent, CardHeader, H5, TextField } from 'ui-neumorphism'
import Icon from '@mdi/react';
import {mdiCheckOutline, mdiCloseCircleOutline} from "@mdi/js"

export default function Login(props) {

    const { handleChangeEmail, handleChangePassword, submited, errors, handleSubmit } = props

    return (
        <motion.div
        className="h-100 d-flex align-items-center">

            <div className="container">

                <div className="row justify-content-center">
                    <Card className="p-md-4 justify-content-center">
                        <CardHeader 
                            title={<H5 className="text-center">Welcome!</H5>}
                            subtitle={<Body1 className="text-center">Login</Body1>}
                        />
                        <CardContent className="mt-4">
                            <motion.div
                              animate={{ scale: [0,1.2,1] }}
                              transition={{ duration: 1 }}
                            >
                                {
                                  errors.email_empty ?
                                  <Caption className="text-danger">Email required</Caption>
                                  :
                                  errors.email_not_valid ?
                                  <Caption className="text-danger">Email not valid</Caption>
                                  :
                                  null
                                }
                            </motion.div>
                            <Body2 className="mb-2">E-mail</Body2>
                            <TextField
                            type="email"
                            className="m-0 mb-4 w-100"
                            inputStyles={{ width: "100%" }}
                            onChange={ handleChangeEmail }
                            append={ submited && !errors.hasOwnProperty("email_empty") && !errors.hasOwnProperty("email_not_valid") ? 
                            <motion.div
                            animate={{
                              scale: [1, 2, 2, 1, 1],
                              rotate: [0, 0, 270, 270, 0]
                            }}
                            ><Icon className="text-success" path={mdiCheckOutline} size={1}/></motion.div> 
                            :
                            submited ?
                            <motion.div
                            animate={{
                              scale: [1, 2, 2, 1, 1],
                              rotate: [0, 0, 270, 270, 0]
                            }}
                            ><Icon className="text-danger" path={mdiCloseCircleOutline} size={1}/></motion.div> 
                            :
                            null }

                            />


                            <motion.div
                              animate={{ scale: [0,1.2,1] }}
                              transition={{ duration: 1 }}
                            >
                            {
                              errors.password_empty ?
                              <Caption className="text-danger">Password required</Caption>
                              :
                              errors.password_not_valid ?
                              <Caption className="text-danger">Password not valid</Caption> 
                              :
                              null
                            }
                            </motion.div>

                            <Body2 className="mb-2">Password</Body2>
                            <TextField 
                            type="password"
                            className="m-0 w-100"
                            inputStyles={{ width: "100%" }}
                            onChange={ handleChangePassword }
                            append={ submited && !errors.hasOwnProperty("password_empty") && !errors.hasOwnProperty("password_not_valid") ? 
                              <motion.div
                            animate={{
                              scale: [1, 2, 2, 1, 1],
                              rotate: [0, 0, 270, 270, 0]
                            }}
                            ><Icon className="text-success" path={mdiCheckOutline} size={1}/></motion.div> 
                            :
                            submited ?
                            <motion.div
                            animate={{
                              scale: [1, 2, 2, 1, 1],
                              rotate: [0, 0, 270, 270, 0]
                            }}
                            ><Icon className="text-danger" path={mdiCloseCircleOutline} size={1}/></motion.div> 
                            :
                            null }


                            />
                            <Button className="w-100 mb-4" onClick={handleSubmit}>Sign In</Button>
                            <Body2 className="text-center" >Not registered? <Link to="/register">Create an account</Link></Body2>
                        </CardContent>
                    </Card>
                </div>

            </div>

        </motion.div>
    )
}

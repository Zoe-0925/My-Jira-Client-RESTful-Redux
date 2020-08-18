import React from 'react'
import {isLoggedIn} from "../ViewComponents/Credential/Auth.service"
import LoginController from "../ViewComponents/Credential/Login"

export default function Login() {
    if (isLoggedIn()){
        history.push("/projects")
      }

    return (
        <div className="Login-Page">
            <p className="logo-title">Mock Jira</p>
            <LoginController />
        </div>
    )
}

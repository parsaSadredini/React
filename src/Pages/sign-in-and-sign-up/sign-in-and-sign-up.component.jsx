import React from 'react'
import './sign-in-and-sign-up.style.scss'
import SigIn from '../../Component/sign-in/SignIn.component'
import SigUp from '../../Component/sign-up/SignUp.component'
import Header from '../../Component/Header/Header.component'
const SignInAndSignUp = () =>{
    return (
        <div>
            <Header/>
            <SigIn/>
            <SigUp/>
        </div>
    )
}

export default SignInAndSignUp
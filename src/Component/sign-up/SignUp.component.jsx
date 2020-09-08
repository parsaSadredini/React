import React from 'react'
import FormInput from '../form-input/FormInput.component'
import CustomButton from '../custom-button/CustomButton.component'
import {auth,createUserProfileDocument} from '../../Firebase/Firebase.utilze'
import './SignUp.style.scss'

export default class SigUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            displayName:'',
            Email:'',
            Password:'',
            confirmPassword:''
        }
    }
    handleSubmit =async (event) =>{
        event.preventDefault()
        const {displayName,Email,Password,confirmPassword} = this.state
        if(Password != confirmPassword){
            alert("Passwords don't match")
            return
        
        }
        try{
            const {user} = auth.createUserWithEmailAndPassword(Email,Password)
            createUserProfileDocument(user,{displayName : displayName})
        }catch(error){

        }

    }

    handleChange = (event) =>{
        const {value , name} = event.target 
        this.setState({
            [name] : value
        })
    }

    render(){
        const {displayName,Email,Password,confirmPassword} = this.state
        return(
            <div className="SignUp">
                <h2 className="title">I Do Not Have An Account</h2>
                <span>Sign Up Wit Your Email</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text" name="displayName" label='Display Name' required value={displayName} onChange={this.handleChange} className=""/>
                    <FormInput type="email" name="Email" label='Email' required value={Email} onChange={this.handleChange} className=""/>
                    <FormInput type="password" name="Password" label='Password' required value={Password} onChange={this.handleChange} className=""/>
                    <FormInput type="password" name="confirmPassword" label='Confirm Password' required value={confirmPassword} onChange={this.handleChange} className=""/>
                    <CustomButton type="submit">
                        Sign Up
                    </CustomButton>
                </form>
            </div>
        )
    }
}

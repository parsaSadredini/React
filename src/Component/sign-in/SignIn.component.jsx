import React from 'react'
import FormInput from '../form-input/FormInput.component'
import './SignIn.style.scss'
import CustomButton from '../custom-button/CustomButton.component'
import {sigInWithGoolge,auth} from '../../Firebase/Firebase.utilze';
export default class SigIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''
        }
    }
    handleSubmit =async (event) =>{
        event.preventDefault()
        const {email,password}=this.state
        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'',password:''})
        }catch(error){
            console.log(error)
        }
        
    }
    handleChange = (event) =>{
        const {value , name} = event.target 
        this.setState({
            [name] : value
        })
    }
    render(){
        return (
            <div className='sign-in'>
                <h2> I already have an account</h2>
                <span>sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} label="email" name="email" value={this.state.email}  type="email" required="true"/>

                    <FormInput handleChange={this.handleChange} label="password" name="password" value={this.state.password} type="password" required="true"/>
                    <div className="buttons">
                        <CustomButton type="submit">
                            submit
                        </CustomButton>

                        <CustomButton onClick={sigInWithGoolge} isGoogleSignIn={true}>
                            Google Sign In
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
} 
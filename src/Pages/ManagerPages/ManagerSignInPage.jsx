import React from 'react'
import CustomButton from '../../Component/custom-button/CustomButton.component'
import FormInput from '../../Component/form-input/FormInput.component'
import {SetManager} from '../../Redux/Manager/manager.action'
import {connect} from 'react-redux'
import config from '../../Global'
import './SignIn.style.scss'

class ManagerSignInPage extends React.Component{
    constructor(){
        super()
        this.state= {
            userName :'',
            password :''
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
            <div className='sign-in-manager'>
                <h2> I already have an account</h2>
                <span>sign in with your userName and password</span>
                
                    <FormInput handleChange={this.handleChange} label="userName" name="userName" value={this.state.userName}  type="text" required="true"/>

                    <FormInput handleChange={this.handleChange} label="password" name="password" value={this.state.password} type="password" required="true"/>
                    
                    <div className="buttons">
                        <CustomButton type="submit" onClick={()=>{
                            const requestOptions ={
                                method : "GET",
                            }
                            console.log(requestOptions)
                            fetch(`${config.ApiUrl}user/login?userName=${this.state.userName}&password=${this.state.password}`,requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                if(data.isSuccess){
                                    console.log(data.data);
                                    this.props.setCurrentManager({
                                        Token :`Bearer ${data.data.token}`,
                                        permissions : data.data.userRoles
                                    })
                                    this.props.history.push("/manager/panel")
                                }else{
                                    alert(data.message)
                                }
                            }) 
                        }}>
                            submit
                        </CustomButton>

                  </div>        
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch)=>({
    setCurrentManager : manager => dispatch(SetManager(manager))
} )
export default connect(null,mapDispatchToProps)(ManagerSignInPage)
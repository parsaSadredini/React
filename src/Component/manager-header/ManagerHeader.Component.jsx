import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import CheckPermission from '../../Utilzs/CheckPermission'
import {withRouter} from 'react-router-dom'
import './Header.style.scss'

class ManagerHeader extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo'/>
            </Link>
            <div className='options'>
                <CheckPermission permissionNeeded="SeeCategory">
                    <p className='option' onClick={()=>{
                        this.props.history.push(`/ShowAllCategories`)
                    }}>
                        Category
                    </p>
                </CheckPermission>
                <CheckPermission permissionNeeded="SeeUser">
                    <p className='option' onClick={()=>{
                        this.props.history.push(`/ShowAllUsers`)
                    }}>
                        User
                    </p>
                </CheckPermission>
                <CheckPermission permissionNeeded="SeeProduct">
                    <p className='option' onClick={()=>{
                        this.props.history.push(`/ShowAllProducts`)
                    }}>
                        Product
                    </p>
                </CheckPermission>
                <CheckPermission permissionNeeded="SeeRole">
                    <p className='option' onClick={()=>{
                        this.props.history.push(`/ShowAllRoles`)
                    }}>
                        Role
                    </p>
                </CheckPermission>
            </div>
        </div>
        )
    }

}
export default withRouter(ManagerHeader)
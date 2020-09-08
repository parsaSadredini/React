import React from 'react'
import {connect} from 'react-redux'
import {getManagerPermissoins} from '../Redux/Manager/manager.selector'

class CheckPermision extends React.Component{
    constructor(props){
        super(props)
       
    }
    checkPermission=()=>{
        return this.props.currentPermissions.some(x=> x.role.name == this.props.permissionNeeded)
    }
    render(){

        return this.checkPermission() ? this.props.children : null
    
    }
}
const mapStateToProps = (state) =>({
    currentPermissions : getManagerPermissoins(state)
})
export default connect(mapStateToProps)(CheckPermision)

import React from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

class ShowOneUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            FullName: '',
            UserRoles: [],
            roles: [],
            id: props.location.state.id,
            isLoading: true
        }
    }

    handleChange = async (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        let requestOptions = {
            method: "GET",
            headers: { 'Authorization': this.props.token }
        }

        fetch(`${config.ApiUrl}role`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    this.setState({
                        roles: data.data,
                    })
                } else {
                    alert(data.message)
                }
            })

        fetch(`${config.ApiUrl}user/${this.state.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    this.setState({
                        UserName: data.data.userName,
                        FullName: data.data.fullname ? data.data.fullname : '',
                        UserRoles: data.data.userRoles,
                        isLoading: false
                    })
                } else {
                    alert(data.message)
                }
            })

    }
    render() {
        const { id, UserName, FullName, UserRoles } = this.state
        const UserId = id;

        if (this.state.isLoaded) {
            return (<p>loading</p>)
        }
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className="sign-in">
                        <FormInput type="text" name="UserName" label='User Username' required value={UserName} onChange={this.handleChange} className="form-control" />
                        <FormInput type="text" name="FullName" label='User FullName' required value={FullName} onChange={this.handleChange} className="form-control" />
                        {
                            this.state.roles.map(({ name, id }) => (
                                <FormInput type="checkbox" checked={UserRoles.find(x => x.roleId == id)} label={name} value={name} onChange={(event) => {
                                    if (event.target.checked) {
                                        this.setState(previousState => ({
                                            UserRoles: [...previousState.UserRoles, { roleId: id, userId: UserId, id }]
                                        }))
                                    } else {
                                        this.setState(previousState => ({
                                            UserRoles: previousState.UserRoles.filter(role => role.roleId != id)
                                        }), () => {
                                            console.log(this.state.UserRoles)
                                        })
                                    }

                                }} className="form-control" />
                            ))
                        }
                        <CustomButton onClick={() => {
                            const userRole = this.state.UserRoles.map((item) => { return { RoleId: item.roleId, UserId: item.userId } })
                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                                body: JSON.stringify({ UserName, FullName, UserRoles: userRole })
                            };
                            fetch(`${config.ApiUrl}user/${id}`, requestOptions)
                                .then(response => response.json())
                                .then(data => { alert(data.message) }).catch(error => alert(error))
                        }}>
                            {/*  */}
                    UPDATE
                </CustomButton>
                        <CustomButton onClick={() => {
                            const requestOptions = {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                            };
                            console.log(requestOptions)
                            fetch(`${config.ApiUrl}user/${id}`, requestOptions)
                                .then(response => response.json())
                                .then(data => { alert(data.message) })
                        }}>
                            DELETE
                </CustomButton>
                    </div>
                </div>
            </div>
        )
    }

}
const mapStatesToProps = state => ({
    token: getToken(state)
})
export default withRouter(connect(mapStatesToProps)(ShowOneUser))
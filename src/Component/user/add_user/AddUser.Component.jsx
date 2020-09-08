import React from 'react'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            Password: '',
            FullName: '',
            UserRoles: [],
            roles: []
        }
    }

    handleChange = async (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)
        })
    }
    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
        }
        fetch(`${config.ApiUrl}role`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    this.setState({
                        roles: data.data,
                        isLoading: false
                    })
                } else {
                    alert(data.message)
                }
            })
    }

    render() {
        const { UserName, Password, FullName } = this.state
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className='sign-in'>
                        <FormInput type="text" name="UserName" label='User Username' required value={UserName} onChange={this.handleChange}className="form-control" />
                        <FormInput type="Password" name="Password" label='User Password' required value={Password} onChange={this.handleChange} className="form-control" />
                        <FormInput type="text" name="FullName" label='User FullName' required value={FullName} onChange={this.handleChange} className="form-control" />
                        {
                            this.state.roles.map(({ name, id }) => (
                                <FormInput type="checkbox" label={name} value={name} onChange={(event) => {
                                    if (event.target.checked) {
                                        this.setState(previousState => ({
                                            UserRoles: [...previousState.UserRoles, { RoleId: id }]
                                        }))
                                    } else {
                                        this.setState(previousState => ({
                                            UserRoles: previousState.UserRoles.filter(role => role.RoleId != id)
                                        }))
                                    }

                                }} className="form-control" />
                            ))
                        }
                        <CustomButton onClick={() => {

                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                                body: JSON.stringify({ UserName, Password, FullName, UserRoles: this.state.UserRoles })
                            };
                            fetch(`${config.ApiUrl}user`, requestOptions)
                                .then(response => response.json())
                                .then(data => { alert(data.message) })
                        }}>
                            Add
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

export default connect(mapStatesToProps)(AddUser)
import React from 'react'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

class AddRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
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


    render() {
        const { name, description } = this.state
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className="sign-in">
                        <FormInput type="text" name="name" label='Role Name' required value={name} onChange={this.handleChange} className="form-control"/>
                        <FormInput type="text" name="description" label='Role Description' required value={description} onChange={this.handleChange} className="form-control" />

                        <CustomButton onClick={() => {

                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                                body: JSON.stringify({ name: name, description: description })
                            };
                            fetch(`${config.ApiUrl}role`, requestOptions)
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

export default connect(mapStatesToProps)(AddRole)
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

class ShowOneProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            name: props.location.state.name,
            id: props.location.state.id,
            description: props.location.state.description,

        }
    }

    handleChange = async (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { id, description, name } = this.state
        if (this.state.isLoaded) {
            return (<p>loading</p>)
        }
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className="sign-in">
                        <FormInput type="text" name="name" label='Product Title' required value={name} onChange={this.handleChange} className="form-control"/>
                        <FormInput type="text" name="description" label='Product Price' required value={description} onChange={this.handleChange} className="form-control" />

                        <CustomButton onClick={() => {


                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                                body: JSON.stringify({ name: name, description: description })
                            };
                            fetch(`${config.ApiUrl}role/${id}`, requestOptions)
                                .then(response => response.json())
                                .then(data => { alert(data.message) })
                        }}>
                            UPDATE
                </CustomButton>
                        <CustomButton onClick={() => {
                            const requestOptions = {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                            };
                            console.log(requestOptions)
                            fetch(`${config.ApiUrl}role/${id}`, requestOptions)
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
export default withRouter(connect(mapStatesToProps)(ShowOneProduct))
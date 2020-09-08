import React from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

class ShowOneCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            title: props.location.state.title,
            id: props.location.state.id

        }
        console.log(this.state)
    }
    handleChange = async (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    render() {
        const { title, id } = this.state
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className="sign-in">
                        <FormInput type="text" name="title" label='Category Title' required value={title} onChange={this.handleChange} className="form-control" />
                        <CustomButton onClick={() => {
                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                                body: JSON.stringify({ Title: this.state.title })
                            };
                            console.log(requestOptions)
                            fetch(`${config.ApiUrl}category/${id}`, requestOptions)
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
                            fetch(`${config.ApiUrl}category/${id}`, requestOptions)
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
export default withRouter(connect(mapStatesToProps)(ShowOneCategory))
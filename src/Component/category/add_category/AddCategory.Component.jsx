import React from 'react'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'
class AddCetegory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
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
        const { title } = this.state
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className='sign-in'>
                        <FormInput type="text" name="title" label='Category Title' required value={title} onChange={this.handleChange} className="form-control" />
                        <CustomButton onClick={() => {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
                                body: JSON.stringify({ Title: this.state.title, 'Authorization': this.props.token })
                            };

                            fetch(`${config.ApiUrl}category`, requestOptions)
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
export default connect(mapStatesToProps)(AddCetegory)
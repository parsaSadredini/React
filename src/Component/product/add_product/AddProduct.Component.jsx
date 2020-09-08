import React from 'react'
import FormInput from '../../form-input/FormInput.component'
import CustomButton from '../../custom-button/CustomButton.component'
import config from '../../../Global'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: 0.0,
            imageUrl: null,
            CategoryID: 0,
            categories: []
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
        fetch(`${config.ApiUrl}category`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    this.setState({
                        categories: data.data,
                        isLoading: false
                    })
                } else {
                    alert(data.message)
                }
            })
    }
    isNumberKey = (event) => {
        var charCode = (event.which) ? event.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            event.preventDefault()
        return true;
    }
    render() {
        const { name, price } = this.state
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className='sign-in'>
                        <FormInput type="text" name="name" label='Product Title' required value={name} onChange={this.handleChange} className="form-control" />
                        <FormInput type="number" name="price" label='Product Price' required value={price} onKeyDown={this.isNumberKey} onChange={this.handleChange} className="form-control" />
                        <div className="form-group">
                            <input className="form-control" type="file" name="imageUrl" required onChange={(event) => {
                                this.setState({
                                    imageUrl: event.target.files[0]
                                })
                            }} />
                        </div>

                        <select className="form-control" name="CategoryID" onChange={this.handleChange}>
                            <option value=""></option>
                            {
                                this.state.categories.map(({ title, id }) => (
                                    <option value={id}>{title}</option>
                                ))
                            }
                        </select>
                        <CustomButton onClick={() => {
                            const formData = new FormData();
                            formData.append("name", this.state.name)
                            formData.append("file", this.state.imageUrl)
                            formData.append("price", this.state.price)
                            formData.append("CategoryID", this.state.CategoryID)
                            const requestOptions = {
                                method: 'POST',
                                credentials: 'same-origin',
                                headers: { 'Authorization': this.props.token },
                                body: formData
                            };
                            fetch(`${config.ApiUrl}product`, requestOptions)
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

export default connect(mapStatesToProps)(AddProduct)
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
            name: '',
            id: props.location.state.id,
            price: 0.0,
            imageUrl: null,
            CategoryID: 0,
            categories: [],
            isLoading: true,
            hasImageChanged: false
        }
        console.log(this.state)
    }
    isNumberKey = (event) => {
        var charCode = (event.which) ? event.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            event.preventDefault()
        return true;
    }
    handleChange = async (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({
            [name]: value
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
                    })
                } else {
                    alert(data.message)
                }
            })

        fetch(`${config.ApiUrl}product/${this.state.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    this.setState({
                        imageUrl: data.data.imageUrl,
                        name: data.data.name,
                        price: data.data.price,
                        CategoryID: data.data.categoryID,
                        isLoading: false
                    })
                } else {
                    alert(data.message)
                }
            })
    }
    render() {
        const { id, CategoryID, price, name } = this.state
        if (this.state.isLoaded) {
            return (<p>loading</p>)
        }
        return (
            <div className="container">

                <ManagerHeader />
                <div className="row">
                    <div className="sign-in">
                        <FormInput type="text" name="name" label='Product Title' required value={name} onChange={this.handleChange} className="form-control" />
                        <FormInput type="number" name="price" label='Product Price' required value={price} onKeyDown={this.isNumberKey} onChange={this.handleChange} className="form-control" />
                        <div className="form-group">
                            <input className="form-control" type="file" name="imageUrl" required onChange={(event) => {
                                this.setState({
                                    imageUrl: event.target.files[0],
                                    hasImageChanged: true
                                })
                            }} />
                        </div>

                        <select className="form-control" value={CategoryID} name="CategoryID" onChange={this.handleChange}>
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
                            if (this.state.hasImageChanged) {
                                formData.append("file", this.state.imageUrl)
                            }
                            formData.append("price", this.state.price)
                            formData.append("CategoryID", this.state.CategoryID)

                            const requestOptions = {
                                method: 'PUT',
                                credentials: 'same-origin',
                                headers: { 'Authorization': this.props.token },
                                body: formData
                            };
                            fetch(`${config.ApiUrl}product/${id}`, requestOptions)
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
                            fetch(`${config.ApiUrl}product/${id}`, requestOptions)
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
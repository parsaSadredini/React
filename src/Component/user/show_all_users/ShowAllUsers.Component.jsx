import React from 'react'
import UserListItem from './UserListItem.Component';
import config from '../../../Global'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'
class ShowAllUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            users: []
        }
    }
    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token },
        }
        fetch(`${config.ApiUrl}user`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    this.setState({
                        users: data.data,
                        isLoading: false
                    })
                } else {
                    alert(data.message)
                }
            })
    }
    render() {
        return (
            <div>
                {this.state.isLoading ?
                    <h2>Loading ...</h2> :
                    <div>
                        <i onClick={() => {
                            this.props.history.push("/AddUser")
                        }}>Add new User</i>
                        <br /><br />
                        <ul className="list-group" style={{ listStyle: 'none' }}>
                            {this.state.users.map(item => (

                                <UserListItem {...item} />

                            ))}
                        </ul>
                    </div>
                }

            </div>
        )
    }
}
const mapStatesToProps = state => ({
    token: getToken(state)
})

export default withRouter(connect(mapStatesToProps)(ShowAllUsers))
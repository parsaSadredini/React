import React from 'react'
import RolesListItem from './RolesListItem.Component';
import config from '../../../Global'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../../../Redux/Manager/manager.selector'

class ShowAllRoles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            roles: []
        }
    }
    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.token }
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
        return (
            <div>

                {this.state.isLoading ?
                    <h2>Loading ...</h2> :
                    <div>
                        <i onClick={() => {
                            this.props.history.push("/AddRole")
                        }}>Add new Role</i>
                        <br /><br />
                        <ul className="list-group" style={{ listStyle: 'none' }}>
                            {this.state.roles.map(item => (

                                <RolesListItem {...item} />

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
export default withRouter(connect(mapStatesToProps)(ShowAllRoles))
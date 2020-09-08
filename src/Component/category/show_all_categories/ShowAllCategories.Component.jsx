import React from 'react'
import CategoryListItem from './CategoryListItem.Component';
import { ExceprionHandler } from '../../../Utilzs/ExceptionHandler'
import { withRouter } from 'react-router-dom'
import config from '../../../Global'
import { getToken } from '../../../Redux/Manager/manager.selector'
import { connect } from 'react-redux'
class ShowAllCategories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            categories: []
        }
    }
    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { 'content-type': 'application/json', 'Authorization': this.props.token }
        }

        fetch(`${config.ApiUrl}category`, requestOptions)
            .then(response => response.json())
            .then(data => {
                ExceprionHandler(data, this.props.history, () => {

                    this.setState({
                        categories: data.data,
                        isLoading: false
                    }, () => {
                        console.log(this.state.categories)
                    })

                })
            })
    }
    render() {
        return (
            <div>
                {this.state.isLoading ?
                    <h2>Loading ...</h2> :
                    <div>
                        <i onClick={() => {
                            this.props.history.push("/AddCategory")
                        }}>Add new Category</i>
                        <br/><br/>
                        <ul className="list-group" style={{listStyle:'none'}}>
                            {this.state.categories.map(item => (

                                <CategoryListItem {...item} />

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
export default withRouter(connect(mapStatesToProps)(ShowAllCategories))
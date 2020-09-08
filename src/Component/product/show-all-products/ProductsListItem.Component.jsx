import React from 'react'
import { withRouter } from 'react-router-dom'

const ProductListItem = ({ name, id, history, match }) => {
    return (

        <li onClick={() => {
            history.push({
                pathname: `${match.url}/${id}`,
                state: {
                    id
                }
            })
        }} className="list-group-item">
            <p>{name}</p>
        </li>

    )
}

export default withRouter(ProductListItem)
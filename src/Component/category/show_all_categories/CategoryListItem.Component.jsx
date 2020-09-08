import React from 'react'
import { withRouter } from 'react-router-dom'

const CategoryListItem = ({ title, id, history, match }) => {
    return (
        <li onClick={() => {
            history.push({
                pathname: `${match.url}/${id}`,
                state: {
                    title, id
                }
            })
        }} className="list-group-item">
            <p>{title}</p>
        </li>
    )
}

export default withRouter(CategoryListItem)
import React from 'react'
import { withRouter } from 'react-router-dom'

const USerListItem = ({ userName, fullname, Password, id, history, match }) => {
  return (
    <li className="list-group-item" onClick={() => {
      history.push({
        pathname: `${match.url}/${id}`,
        state: {
          id
        }
      })
    }}><p>
        {userName} / {fullname}
      </p>
    </li>
  )
}

export default withRouter(USerListItem)
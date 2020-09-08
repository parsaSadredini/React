import React from 'react'
import {withRouter}  from 'react-router-dom'

const RoleListItem = ({name ,id,description,history,match}) => {
    return (
        
            <li onClick={()=> {
                history.push({
                    pathname: `${match.url}/${id}`,
                    state: {
                      name,id,description
                    }
                  })
            }} className="list-group-item">
                <p>{name}</p>
            </li>
       
    )
}
export default withRouter(RoleListItem)
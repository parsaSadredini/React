import React from 'react'
import ShowAllRoles from '../../../Component/roles/show_all_roles/ShowAllRoles.Component'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

const ShowAllRolesPage = () => (
    <div className="container">
        <ManagerHeader />
        <div className="row">
            <ShowAllRoles />
        </div>
    </div>

)

export default ShowAllRolesPage


import React from 'react'
import ShowAllUsers from '../../../Component/user/show_all_users/ShowAllUsers.Component'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

const ShowAllUsersPage = () => (
    <div className="container">
        <ManagerHeader />
        <div className="row">
            <ShowAllUsers />
        </div>
    </div>
)

export default ShowAllUsersPage
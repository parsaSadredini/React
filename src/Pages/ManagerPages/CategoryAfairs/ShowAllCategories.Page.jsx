import React from 'react'
import ShowAllCategories from '../../../Component/category/show_all_categories/ShowAllCategories.Component'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'
const ShowAllCategoriesPage = () => (
    <div className="container">
        <ManagerHeader/>
        <div className="row">
            <ShowAllCategories />
        </div>
    </div>

)

export default ShowAllCategoriesPage
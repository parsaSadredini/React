import React from 'react'
import ShowAllproducts from '../../../Component/product/show-all-products/ShowAllProducts.Component'
import ManagerHeader from '../../../Component/manager-header/ManagerHeader.Component'

const ShowAllProductsPage = () => (
    <div className="container">
        <ManagerHeader />
        <div className="row">
            <ShowAllproducts />
        </div>
    </div>
)

export default ShowAllProductsPage
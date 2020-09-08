import React from "react"
import "./collection-item.style.scss"
import CustomButton from '../custom-button/CustomButton.component'
import {connect} from 'react-redux'
import {AddItem} from '../../Redux/Cart/cart.action'
 const CollectionItem = ({item,addItem}) =>{
    const {name,price,imageUrl} = item
    return (
        <div className='collection-item'>
            <div style={{backgroundImage : `url(${imageUrl})`}} className="image"/>
                <div className="collection-footer">
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </div>
                <CustomButton inverted={true} onClick={()=>{
                    addItem(item)
                }}>
                    Add To Cart
                </CustomButton>
        </div>
    )
}

const dispatchStateToProps = (dispatch) =>({
    addItem : Item => dispatch(AddItem(Item))   
})
export default connect(null,dispatchStateToProps)(CollectionItem)
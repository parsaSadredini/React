import React from 'react'
import './CheckoutItem.style.scss'
import {connect} from 'react-redux'
import {RemoveItem,AddItem,DecreaseItem} from '../../Redux/Cart/cart.action'
const CheckoutItem = ({cartItem , RemoveItem,AddItem ,DecreaseItem}) => {
    const { name ,imageUrl,price,quantity} = cartItem
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={()=>{
                    AddItem(cartItem)
                }}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span> 
                <div className='arrow' onClick={()=>{
                    DecreaseItem(cartItem)
                }}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={()=>{
                RemoveItem(cartItem)
            }}>&#10005;</div>
        </div>
    )
}
const dispatchStateToProp = (dispatch)=>{
    return {
        RemoveItem : item => dispatch(RemoveItem(item)),
        AddItem : item => dispatch(AddItem(item)),
        DecreaseItem : item => dispatch(DecreaseItem(item))
    }
}

export default connect(null,dispatchStateToProp)(CheckoutItem)

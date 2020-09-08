import React from 'react'
import './CartItem.style.scss'

const CartItem = ({item : {name,price,imageUrl,quantity}}) =>{
    return (
        <div className='cart-item'>
            <img src={imageUrl} alt={name}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='quantity'>{quantity} x ${price}</span>
                
            </div>
        </div>
    )
}

export default CartItem
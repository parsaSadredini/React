import React from 'react'
import './CheckOutPage.style.scss'
import CheckoutItem from '../../Component/checkout-item/CheckoutItem.component'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCartItems,selectTotal} from '../../Redux/Cart/cart.selector'
import Header from '../../Component/Header/Header.component'
const CheckOutPage = ({total,cartItems}) =>{
    return (
        <div className='checkout-page'>
          <Header/>
        <div className='checkout-header'>
    
          <div className='header-block'>
    
            <span>Product</span>
    
          </div>
    
          <div className='header-block'>
    
            <span>Description</span>
    
          </div>
    
          <div className='header-block'>
    
            <span>Quantity</span>
    
          </div>
    
          <div className='header-block'>
    
            <span>Price</span>
    
          </div>
    
          <div className='header-block'>
    
            <span>Remove</span>
    
          </div>
    
        </div>
    
        {cartItems.map(cartItem => (
    
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    
        ))}
    
        <div className='total'>TOTAL: ${total}</div>
    
      </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    total: selectTotal

})
export default connect(mapStateToProps)(CheckOutPage)
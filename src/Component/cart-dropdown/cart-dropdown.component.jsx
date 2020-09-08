import React from 'react'
import CustomButton from '../custom-button/CustomButton.component'
import CartItem from '../cart-items/CartItem.component'
import './cart-dropdown.style.scss'
import {connect} from 'react-redux'
import {selectCartItems} from  '../../Redux/Cart/cart.selector'
import {ToggleHidden} from '../../Redux/Cart/cart.action'
import {withRouter}  from 'react-router-dom'
const CartDropDown = (props) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                props.cartItems.length ? 
                    props.cartItems.map(item=> <CartItem key={item.id} item={item}/>)
                :
                <span className='empty-message'>Cart Is Empty</span>
                }
        </div>
        <CustomButton onClick ={()=>{
            props.history.push('/checkout')
            props.dispatch(ToggleHidden())
        }}>
            Go To CHECKOUT
        </CustomButton>
    </div>
)
const mapStateToProps = (state)=>{
    return {
        cartItems : selectCartItems(state)
    }
} 
export default withRouter(connect(mapStateToProps)(CartDropDown))

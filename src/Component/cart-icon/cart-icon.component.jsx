import React from 'react'
import './cart-icon.style.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import {connect} from 'react-redux'
import {ToggleHidden} from '../../Redux/Cart/cart.action'
import {selecetCartItemsCount} from '../../Redux/Cart/cart.selector'
const CartIcon = ({toggleHiddenCart,itemCount}) =>{
    return(
        <div className='cart-icon'>
            <ShoppingIcon className='shopping-icon' onClick={toggleHiddenCart}/>
            <span className='item-count'>  {itemCount}</span>
        </div>
    )
};


const dispatchStateToProps = (dispatch) =>{
    return {
        toggleHiddenCart : () => dispatch(ToggleHidden())
    }
}
const mapStatesToProp = (state) =>{

    return {itemCount : selecetCartItemsCount(state) }
}
export default connect(mapStatesToProp,dispatchStateToProps)(CartIcon)
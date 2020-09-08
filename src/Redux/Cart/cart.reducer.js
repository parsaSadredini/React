import CartType from './cart.type'
import {addItemTOCart,removeItemFromCart,decreaseItemFromCart} from './cart.utils'
const INITIAL_STATE = {
    hidden : true,
    cartItems:[]
}
const CartReducer =(state=INITIAL_STATE,action) => {
    switch (action.type){
        case CartType.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
            case CartType.ADD_ITEM : 
                return{
                    ...state,
                    cartItems: addItemTOCart(state.cartItems,action.payload)
                }
            case CartType.REMOVE_ITEM:
                return{
                    ...state,
                    cartItems: removeItemFromCart(state.cartItems, action.payload)
                }
            case CartType.DECREASE_ITEM:
                return{
                    ...state,
                    cartItems:decreaseItemFromCart(state.cartItems,action.payload) 
                }
        default :
            return state;
    }
}

export default CartReducer
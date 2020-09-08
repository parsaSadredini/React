import {createSelector} from 'reselect'

const selectCart = state => state.cart

export const selectCartItems = createSelector([selectCart], carts => carts.cartItems)
export const selectCartHidden = createSelector([selectCart], carts => carts.hidden)
export const selectTotal = createSelector([selectCart], carts => {
   const tottal= carts.cartItems.reduce((accumulativePrice,cart)=> accumulativePrice+= cart.price * cart.quantity,0)
    return tottal
})
export const selecetCartItemsCount = createSelector([selectCartItems], cartItems => cartItems.reduce((accumalatedQuantity,cartItem)=> accumalatedQuantity + cartItem.quantity,0))
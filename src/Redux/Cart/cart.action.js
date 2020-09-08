import CartType from './cart.type'

export const ToggleHidden = ()=>(
    {
        type:CartType.TOGGLE_CART_HIDDEN
    }
)

export const AddItem = (Item) =>({
        type: CartType.ADD_ITEM,
        payload : Item
})
export const RemoveItem = (Item) =>({
    type: CartType.REMOVE_ITEM,
    payload : Item
})

export const DecreaseItem = (Item) =>({
    type: CartType.DECREASE_ITEM,
    payload : Item
})
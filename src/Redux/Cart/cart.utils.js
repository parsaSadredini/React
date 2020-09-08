export const addItemTOCart= (cartItems, cartItemToAdd) => {

    const existingCartItem = cartItems.find(
  
      cartItem => cartItem.id === cartItemToAdd.id
  
    );
  
  
  
    if (existingCartItem) {
  
      return cartItems.map(cartItem =>
  
        cartItem.id === cartItemToAdd.id
  
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
  
          : cartItem
  
      );
  
    }
  
  
  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  
  };

  export const removeItemFromCart = (cartItems,desiredCart) =>{
      return cartItems.filter(cart => cart.id != desiredCart.id)
  }

  export const decreaseItemFromCart = (cartItems,cartItemToRemove) =>{
    const existingCartItem =  cartItems.find(cart => cart.id == cartItemToRemove.id)  
    if(existingCartItem.quantity ==  1){
       return cartItems.filter(cart => cart.id != cartItemToRemove.id)
    }

    return cartItems.map(item => item.id == cartItemToRemove.id ? {...item, quantity : item.quantity - 1 }: item)

} 
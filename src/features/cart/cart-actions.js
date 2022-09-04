import { setCartItems } from './cart-slice';

// ---------------------------------------helping functionalities------------------------------------
export const addCartItem = (cartItems, cartItemToAdd) => {
  // find if exist producttoadd
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );
  // add quatity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array when there is new product
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  // find if exist cartItemToremove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );
  //if quantity = 1 then remove item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }
  // remove quatity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  // return new array when there is new product
  return [...cartItems, { ...cartItemToRemove, quantity: 1 }];
};

export const deleteCartItem = (cartItems, cartItemToDelete) =>
  cartItems.filter(cartItem => cartItem.id !== cartItemToDelete.id);

// -------------------------modified actions using helping functionalities---------------------------------------
export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

export const removeItemToCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

export const deleteItemToCart = (cartItems, product) => {
  const newCartItems = deleteCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

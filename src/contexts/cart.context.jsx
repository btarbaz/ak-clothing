import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  deleteItemToCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});
const CART_ACTION_TYPE = {
  INITIAL_CART_ITEMS: 'INITIAL_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};
const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartTotal: 0,
  cartCount: 0,
  cartItems: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.INITIAL_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled error type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const [{ isCartOpen, cartCount, cartItems, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_CART_STATE);
  // // Count of cart
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // // Total of Cart
  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const updatedCartItemsReducer = newCartItems => {
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPE.INITIAL_CART_ITEMS, {
        cartTotal: newCartTotal,
        cartCount: newCartCount,
        cartItems: newCartItems,
      })
    );
  };
  const setIsCartOpen = bool => {
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
  };
  const addItemToCart = product => {
    const newCartItems = addCartItem(cartItems, product);
    updatedCartItemsReducer(newCartItems);
  };

  const removeItemToCart = product => {
    const newCartItems = removeCartItem(cartItems, product);
    updatedCartItemsReducer(newCartItems);
  };

  const deleteItemToCart = product => {
    const newCartItems = deleteCartItem(cartItems, product);
    updatedCartItemsReducer(newCartItems);
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    deleteItemToCart,
    addItemToCart,
    removeItemToCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

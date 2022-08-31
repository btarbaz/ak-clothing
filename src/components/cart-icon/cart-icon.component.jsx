import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
  selectCartCount,
  selectisCartOpen,
} from '../../store/cart/cart.selector';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectisCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};
export default CartIcon;

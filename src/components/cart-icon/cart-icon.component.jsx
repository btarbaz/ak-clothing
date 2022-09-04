import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import {
  setIsCartOpen,
  selectCartCount,
  selectIsCartOpen,
} from '../../features/cart/cart-slice';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
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

import { CartItemContainer, CartItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <CartItemDetails>
        <span>{name}</span>
        <span>
          {quantity} X Rs.{price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};
export default CartItem;

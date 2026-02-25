const CartItem = ({ item }) => {
  return (
    <div>
      <p>{item.name}</p>
      <p>₹{item.price}</p>
    </div>
  );
};

export default CartItem;
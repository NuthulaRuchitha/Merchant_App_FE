import { useStore } from "../../../shared/components/useStore";

const ProductCard = ({ product }) => {
  const { cart, addToCart, decreaseQuantity } = useStore();

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between h-[360px]">

      <div className="h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="text-lg font-bold text-[#131921] mt-2">
          ₹{product.price}
        </p>
      </div>

      {/* Add / Quantity Controls */}
      {cartItem ? (
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>

          <span className="font-semibold text-lg">
            {cartItem.quantity}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-400 hover:bg-yellow-500 py-2 rounded mt-3"
        >
          Add to Cart
        </button>
      )}

    </div>
  );
};

export default ProductCard;
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../shared/components/useStore";

const CartPage = () => {
  const { cart, addToCart, decreaseQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="text-3xl font-bold mb-8 text-[#131921]">
        Shopping Cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT - Cart Items */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">

          {cart.length === 0 ? (
            <p className="text-gray-600 text-lg">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between border-b py-6"
              >

                {/* Product Info */}
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-[#131921]">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    ₹{item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">

                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      −
                    </button>

                    <span className="px-4 py-1 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="font-bold text-[#131921]">
                    ₹{item.price * item.quantity}
                  </span>

                </div>

              </div>
            ))
          )}

        </div>

        {/* RIGHT - Order Summary */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 h-fit">

          <h3 className="text-xl font-semibold mb-6 text-[#131921]">
            Order Summary
          </h3>

          <div className="flex justify-between mb-3">
            <span>Items ({totalItems})</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery</span>
            <span className="text-green-600 font-medium">
              FREE
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/payment")}
            disabled={cart.length === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md transition disabled:opacity-50"
          >
            Proceed to Payment
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartPage;
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
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-[#131921]">
          Shopping Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT - Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">

            {cart.length === 0 ? (
              <p className="text-gray-500 text-lg">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b last:border-none py-5"
                >

                  {/* Product Left Section */}
                  <div className="flex items-center gap-6">

                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#131921]">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 mt-1">
                        ₹{item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          −
                        </button>

                        <span className="font-semibold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 flex items-center justify-center bg-yellow-400 rounded hover:bg-yellow-500 transition"
                        >
                          +
                        </button>

                      </div>
                    </div>

                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#131921]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                </div>
              ))
            )}

          </div>

          {/* RIGHT - Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">

            <h3 className="text-xl font-semibold mb-6 text-[#131921]">
              Order Summary
            </h3>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Items ({totalItems})</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">
                FREE
              </span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold mb-6 text-[#131921]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/payment")}
              disabled={cart.length === 0}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              Proceed to Payment
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartPage;
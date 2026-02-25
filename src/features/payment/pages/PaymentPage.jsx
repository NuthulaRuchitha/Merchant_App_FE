import { useNavigate } from "react-router-dom";
import { useStore } from "../../../shared/components/useStore";
import { useState } from "react";

const PaymentPage = () => {
  const { cart, clearCart, setOrderConfirmed } = useStore();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      clearCart();
      setOrderConfirmed(true);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="text-3xl font-bold mb-8 text-[#131921]">
        Select Payment Method
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDE - Payment Methods */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">

          {/* Payment Options */}
          <div className="space-y-4 mb-6">

            <div
              onClick={() => setSelectedMethod("upi")}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedMethod === "upi" ? "border-yellow-500 bg-yellow-50" : ""
              }`}
            >
              <h4 className="font-semibold">UPI Payment</h4>
              <p className="text-sm text-gray-600">
                Pay using Google Pay, PhonePe, Paytm
              </p>
            </div>

            <div
              onClick={() => setSelectedMethod("card")}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedMethod === "card" ? "border-yellow-500 bg-yellow-50" : ""
              }`}
            >
              <h4 className="font-semibold">Credit / Debit Card</h4>
              <p className="text-sm text-gray-600">
                Visa, MasterCard, RuPay
              </p>
            </div>

            <div
              onClick={() => setSelectedMethod("netbanking")}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedMethod === "netbanking"
                  ? "border-yellow-500 bg-yellow-50"
                  : ""
              }`}
            >
              <h4 className="font-semibold">Net Banking</h4>
              <p className="text-sm text-gray-600">
                All major Indian banks supported
              </p>
            </div>

            <div
              onClick={() => setSelectedMethod("stablecoin")}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedMethod === "stablecoin"
                  ? "border-yellow-500 bg-yellow-50"
                  : ""
              }`}
            >
              <h4 className="font-semibold">Stablecoin (USDT / USDC)</h4>
              <p className="text-sm text-gray-600">
                Pay using crypto wallet
              </p>
            </div>

          </div>

          {/* Dynamic Payment Form */}

          {selectedMethod === "upi" && (
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Enter UPI ID
              </label>
              <input
                type="text"
                placeholder="example@upi"
                className="w-full border rounded-md p-3"
              />
            </div>
          )}

          {selectedMethod === "card" && (
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-md p-3"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border rounded-md p-3"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border rounded-md p-3"
                />
              </div>
            </div>
          )}

          {selectedMethod === "netbanking" && (
            <div className="mb-6">
              <select className="w-full border rounded-md p-3">
                <option>Select Bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          {selectedMethod === "stablecoin" && (
            <div className="mb-6">
              <div className="bg-gray-100 p-4 rounded text-sm break-all">
                Send USDT/USDC to:
                <br />
                0xA12b34C56d78E90f1234567890abcdef12345678
              </div>
            </div>
          )}

          <button
            onClick={() => {
                if (selectedMethod === "stablecoin") {
                const orderId = "ORD-" + Date.now();

                window.location.href =
                    `http://localhost:5174/dashboard/transfer?orderId=${orderId}`;
                } else {
                handlePayment();
                }
            }}
            disabled={cart.length === 0 || processing}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md transition disabled:opacity-50"
            >
            {processing ? "Processing Payment..." : "Pay Now"}
          </button>

        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 h-fit">

          <h3 className="text-xl font-semibold mb-6 text-[#131921]">
            Order Summary
          </h3>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-3 text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
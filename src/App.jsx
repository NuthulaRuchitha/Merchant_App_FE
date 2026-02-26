import { Routes, Route } from "react-router-dom";

import HomePage from "./features/home/pages/HomePage";
// import ProductListPage from "./features/products/pages/ProductListPage";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";
import OrdersPage from "./features/orders/pages/OrdersPage";
import Navbar from "./shared/components/Navbar";
import PaymentPage from "./features/payment/pages/PaymentPage";
import BankLoginPage from "./features/payment/pages/BankLoginPage";
import PaymentCallbackPage from "./features/payment/pages/paymentCallbackPage";
import PaymentConfirmPage from "./features/payment/pages/BankConfirmPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/products" element={<ProductListPage />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
        {/* payment flow */}
        <Route path="/payment"             element={<PaymentPage />} />
        <Route path="/payment/bank-login"  element={<BankLoginPage />} />
        <Route path="/payment/confirm"     element={<PaymentConfirmPage />} />
        <Route path="/payment/callback"    element={<PaymentCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
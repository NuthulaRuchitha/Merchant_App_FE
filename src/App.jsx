import { Routes, Route } from "react-router-dom";

import HomePage from "./features/home/pages/HomePage";
// import ProductListPage from "./features/products/pages/ProductListPage";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";
import OrdersPage from "./features/orders/pages/OrdersPage";
import Navbar from "./shared/components/Navbar";
import PaymentPage from "./features/payment/pages/PaymentPage";

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
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
}

export default App;
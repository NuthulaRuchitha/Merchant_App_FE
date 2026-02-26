import { useState, useEffect } from "react";
import { StoreContext } from "./StoreContext";

const StoreProvider = ({ children }) => {

  // ✅ Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // ✅ Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // ✅ Clear cart AFTER successful payment
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        clearCart,
        orderConfirmed,
        setOrderConfirmed,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
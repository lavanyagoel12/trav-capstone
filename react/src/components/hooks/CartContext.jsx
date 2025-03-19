import React, { createContext, useContext, useState } from "react";

// Creating an authentication context
const CartContext = createContext(null);

// Auth provider component that wraps your app components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = (item) => {
    setCart(item); // In real scenarios, you might want to invalidate the session on the server as well
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use authentication
export const useCart = () => useContext(CartContext);

// Cart.js
import React from "react";
import { useEffect, useState } from "react";
import { useCart } from "./hooks/CartContext";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeFromCart = (index) => {
    const newCartItems = cart.filter((_, i) => i !== index);
    updateCart(newCartItems);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.record_name} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;

// Cart.js
import React from "react";
import { useEffect, useState } from "react";

const Cart = ({ removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  //Added//
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/records`);
        if (!response.ok) {
          throw new Error("Record data could not be fetched!");
        }
        const json_response = await response.json();
        setCartItems(json_response);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
  });

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
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

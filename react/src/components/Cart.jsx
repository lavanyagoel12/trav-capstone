import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./hooks/CartContext";

const Cart = () => {
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const total = cart.reduce((sum, item) => {
    if (item && item.price !== undefined) {
      return sum + item.price;
    }
    return sum;
  }, 0);

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (cart.length > 0) {
      // Send cart items to the backend
      axios
        .post("http://localhost:5000/run-model", { cart_items: cart })
        .then((response) => {
          setPredictions(response.data.predictions);
        })
        .catch((error) => {
          console.error("Error running model:", error);
        });
    }
  }, [cart]);

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
            {predictions[index] && (
              <span> - Prediction: {predictions[index]}</span>
            )}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      {predictions.length > 0 && (
        <div>
          <h3>Predicted Items:</h3>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul>
        </div>
      )}
      <button>Add to cart</button>
    </div>
  );
};

export default Cart;

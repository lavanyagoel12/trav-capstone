// Checkout.js
import React from "react";

const Checkout = ({ total }) => {
  const handleCheckout = () => {
    alert(`Checkout successful! Total: $${total.toFixed(2)}`);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;

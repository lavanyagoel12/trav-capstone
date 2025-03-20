// ProductList.js
import React from "react";
import { useCart } from "./hooks/CartContext";
import { useNavigate } from "react-router-dom";

const ProductList = ({ heading, products }) => {
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const navigate = useNavigate();

  const addToCart = (product) => {
    updateCart([...cart, product]);
  };
  const handleDetailsClick = (recordId) => {
    navigate("/details/" + recordId);
  };

  return (
    <div style={{ margin: "20px", alignSelf: "start" }}>
      <h2>{heading}</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.record_name} - ${product.price}
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
              style={{ margin: "20px" }}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-info"
              onClick={(e) => handleDetailsClick(product._id)}
              style={{ margin: "20px" }}
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

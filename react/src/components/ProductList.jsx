// ProductList.js
import React from "react";

const ProductList = ({ products, addToCart }) => {
  return (
    <div style={{ margin: "20px", alignSelf: "start" }}>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.record_name} - ${product.price}
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
              style={{ margin: "20px" }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

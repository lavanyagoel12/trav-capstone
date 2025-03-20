// Checkout.js
import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { useCart } from "./hooks/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [record, setRecord] = useState([]);
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/records/${id}`);
        if (!response.ok) {
          throw new Error("Record data could not be fetched!");
        }
        const json_response = await response.json();
        setRecord(json_response);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchRecordData();
  }, []);

  const addToCart = () => {
    updateCart([...cart, record[0]]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{
          margin: "5%",
          width: "80%",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{record[0]?.record_name} Details</h5>
          <div className="card-text">Genre: {record[0]?.genre}</div>
          <div className="card-text">Popularity: {record[0]?.popularity}/5</div>
          <div className="card-text">Condition: {record[0]?.condition}/10</div>
          <div className="card-text">Price: ${record[0]?.price}</div>
        </div>

        <div
          className="card-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            className="btn btn-primary"
            onClick={addToCart}
            style={{ margin: "20px" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

// Checkout.js
import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

const GenreProductList = () => {
  const { genre } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/genres/${genre}`);
        if (!response.ok) {
          throw new Error("Record data could not be fetched!");
        }
        const json_response = await response.json();
        setRecords(json_response);
        console.log(records);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchRecordData();
  }, []);
  return (
    <div>
      <ProductList
        heading={
          genre == "0"
            ? "Other Records"
            : genre.charAt(0).toUpperCase() + genre.slice(1) + " Records"
        }
        products={records}
      />
      {/* <button onClick={handleCheckout}>Proceed to Checkout</button> */}
    </div>
  );
};

export default GenreProductList;

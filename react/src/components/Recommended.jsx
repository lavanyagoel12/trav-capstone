import React, { useState } from "react";
import axios from "axios";

const Recommendations = ({ cartFeatures }) => {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = async () => {
    try {
      const response = await axios.post("http://localhost:5000/recommend", {
        features: cartFeatures,
      });
      setRecommendations(response.data.recommendation);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <button onClick={getRecommendations}>Get Recommendations</button>
      <ul>
        {recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;

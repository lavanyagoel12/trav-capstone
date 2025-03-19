import React from "react";

const Promo = (props) => {
  return (
    <div className="card" style={{ flex: "1", minWidth: "200px" }}>
      <div className="card bg-light">
        <div className="card-text">{}</div>
        <div className="card-text">
          <a href="#">Click to buy!</a>
        </div>
      </div>
    </div>
  );
};

export default Promo;

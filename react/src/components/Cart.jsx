// Cart.js
import React from "react";
import { useEffect, useState } from "react";
import { useCart } from "./hooks/CartContext";
import { Col, Row, Button, Table } from "reactstrap";
import s from "./Cart.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = (props) => {
  // const [cartItems, setCartItems] = useState([]);
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const [recItems, setRecItems] = useState([]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  const removeFromCart = (index) => {
    const newCartItems = cart.filter((_, i) => i !== index);
    updateCart(newCartItems);
  };

  const addToCart = (product) => {
    updateCart([...cart, product]);
    const newRecItems = recItems.filter((i, _) => i !== product);
    setRecItems(newRecItems);
  };

  const handleDetailsClick = async (recordId) => {
    console.log("handleDetails clicked: " + recordId);
    await props.setIsCartOpen(false);
    navigate("/details/" + recordId);
  };

  useEffect(() => {
    const fetchRecommendedRecords = async () => {
      try {
        const response = await fetch(`http://localhost:3000/featured`);
        if (!response.ok) {
          throw new Error("Record data could not be fetched!");
        }
        const json_response = await response.json();
        setRecItems(json_response.slice(0, 3));
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchRecommendedRecords();
  }, []);

  return (
    <div>
      <Col xs={12} lg={12} style={{ margin: "2%" }}>
        <h2 className={"fw-bold mt-4 mb-5"}>Shopping Cart</h2>
        <Table borderless>
          <thead>
            <tr style={{ borderBottom: "1px solid #D9D9D9" }}>
              <th className={"bg-transparent text-dark px-0"}>Record</th>
              <th className={"bg-transparent text-dark px-0"}>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <h5 className={"fw-bold mt-3"}>No items</h5>
            ) : (
              <>
                {cart.map((item, index) => (
                  <tr className={"mt-2"}>
                    <td
                      className={"px-0 pt-4"}
                      onClick={(e) => handleDetailsClick(item._id)}
                    >
                      <div className={"d-flex align-items-center"}>
                        <img
                          src={item.album_cover}
                          width={100}
                          className={"mr-8"}
                          style={{ marginRight: "2%" }}
                        />
                        <div>
                          <h5 className={"fw-bold"}>{item.record_name}</h5>
                        </div>
                      </div>
                    </td>
                    <td
                      className={"px-0 pt-4"}
                      onClick={(e) => handleDetailsClick(item._id)}
                    >
                      <h6 className={"fw-bold mb-0"}>
                        ${item.price.toFixed(2)}
                      </h6>
                    </td>
                    <td className={"px-0 pt-4"}>
                      <CloseIcon
                        className={"bg-transparent border-0 p-0"}
                        onClick={() => {
                          removeFromCart(index);
                          toast.info("product successfully removed");
                        }}
                      ></CloseIcon>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </Col>
      <Col xs={12} lg={12} style={{ margin: "2%" }}>
        <h2 className={"fw-bold mt-4 mb-5"}>Records For You</h2>
        <Table borderless>
          <thead>
            <tr style={{ borderBottom: "1px solid #D9D9D9" }}>
              <th className={"bg-transparent text-dark px-0"}>Record</th>
              <th className={"bg-transparent text-dark px-0"}>Price</th>
            </tr>
          </thead>
          <tbody>
            {recItems.length === 0 ? (
              <h5 className={"fw-bold mt-3"}>No items</h5>
            ) : (
              <>
                {recItems.map((item, index) => (
                  <tr className={"mt-2"}>
                    <td className={"px-0 pt-4"}>
                      <div className={"d-flex align-items-center"}>
                        <img
                          src={item.album_cover}
                          width={100}
                          className={"mr-8"}
                          style={{ marginRight: "2%" }}
                        />
                        <div>
                          <h5 className={"fw-bold"}>{item.record_name}</h5>
                        </div>
                      </div>
                    </td>
                    <td className={"px-0 pt-4"}>
                      <h6 className={"fw-bold mb-0"}>
                        ${item.price.toFixed(2)}
                      </h6>
                    </td>
                    <td className={"px-0 pt-4"}>
                      <AddIcon
                        className={"bg-transparent border-0 p-0"}
                        onClick={() => {
                          addToCart(item);
                          toast.info("product successfully added");
                        }}
                      ></AddIcon>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </Col>
      <Col xs={12} lg={12} style={{ margin: "2%" }}>
        <section className={s.cartTotal}>
          <div className={"d-flex"}>
            <h5 className={"fw-bold"} style={{ marginRight: 63 }}>
              Total:
            </h5>
            <h5 className={"fw-bold"}>${total.toFixed(2)}</h5>
          </div>
          <Button
            color={"primary"}
            className={`${s.checkOutBtn} text-uppercase fw-bold`}
          >
            Check out
          </Button>
        </section>
      </Col>
    </div>
  );
};

export default Cart;

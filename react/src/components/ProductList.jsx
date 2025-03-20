// // ProductList.js
import React from "react";
import { useCart } from "./hooks/CartContext";
import { useNavigate } from "react-router-dom";

// const ProductList = ({ heading, products }) => {
//   const cartCont = useCart();
//   const cart = cartCont.cart;
//   const updateCart = cartCont.updateCart;
//   const navigate = useNavigate();

//   const addToCart = (product) => {
//     updateCart([...cart, product]);
//   };
//   const handleDetailsClick = (recordId) => {
//     navigate("/details/" + recordId);
//   };

//   return (
//     <div style={{ margin: "20px", alignSelf: "start" }}>
//       <h2>{heading}</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             {product.record_name} - ${product.price}
//             <button
//               className="btn btn-primary"
//               onClick={() => addToCart(product)}
//               style={{ margin: "20px" }}
//             >
//               Add to Cart
//             </button>
//             <button
//               className="btn btn-info"
//               onClick={(e) => handleDetailsClick(product._id)}
//               style={{ margin: "20px" }}
//             >
//               Details
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

// import React from "react";
import { Container, Row, Col, Input, Button, Modal } from "reactstrap";
// import Checkbox from "react-custom-checkbox";
// import InputRange from "react-input-range";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
import s from "./Shop.module.scss";

// import InfoBlock from "components/e-commerce/InfoBlock";
// import filter from "public/images/e-commerce/filter.svg";
// import relevant from "public/images/e-commerce/relevant.svg";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import Head from "next/head";
// import InstagramWidget from "components/e-commerce/Instagram";
// import arrowRight from "../../public/images/e-commerce/home/arrow-right.svg";
// import rating from "../../public/images/e-commerce/details/stars.svg";
// import productsListActions from "../../redux/actions/products/productsListActions";

const ProductList = ({ heading, products }) => {
  const [width, setWidth] = React.useState(1440);
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const navigate = useNavigate();

  const addToCart = (product) => {
    updateCart([...cart, product]);
  };
  const handleDetailsClick = (recordId) => {
    console.log("handleDetails clicked");
    navigate("/details/" + recordId);
  };

  return (
    <>
      <head>
        <title>Shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
        <meta name="keywords" content="flatlogic, react templates" />
        <meta name="author" content="Flatlogic LLC." />
        <meta charSet="utf-8" />

        <meta
          property="og:title"
          content="Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://flatlogic-ecommerce.herokuapp.com/"
        />
        <meta
          property="og:image"
          content="https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"
        />
        <meta
          property="og:description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="712557339116053" />

        <meta property="og:site_name" content="Flatlogic" />
        <meta name="twitter:site" content="@flatlogic" />
      </head>
      <Container className={"mb-5"} style={{ marginTop: 32 }}>
        <Row>
          <ToastContainer />
          <Col sm={width <= 768 ? 12 : 9}>
            <Row>
              {console.log("len: " + products.length)}
              <h6
                className={"fw-bold font-size-base mt-1"}
                style={{ fontSize: 24 }}
              >
                {heading}
              </h6>
              {products.map((item, index) => (
                <Col md={6} lg={4} xs={12} className={`mb-4`} key={index}>
                  {/* <Modal
                    // isOpen={openState[`open${index}`]}
                    toggle={() => dispatch({ type: `open${index}` })}
                  >
                    <div className={s.modalWidndow}>
                      <div className={s.image}>
                        <img
                          src={item.album_cover}
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                      <div
                        className={`${s.content} p-4 d-flex flex-column justify-content-between`}
                      >
                        <a className={"fw-semi-bold"}>
                          More about product
                           <img
                            src={}
                            alt={"arrow"}
                            className={"ml-2"}
                          /> 
                        </a>
                        <h6 className={`text-muted`}>{item.record_name}</h6>
                        <h4 className={"fw-bold"}>{item.record_name}</h4>

                        <div className={"d-flex"}>
                          <div
                            className={
                              "d-flex flex-column justify-content-between"
                            }
                          >
                            <h6 className={"fw-bold text-muted text-uppercase"}>
                              Price
                            </h6>
                            <h6 className={"fw-bold"}>{item.price}$</h6>
                          </div>
                        </div>
                        <div className={"d-flex mt-5"}>
                          <Button
                            outline
                            color={"primary"}
                            className={"flex-fill mr-4 text-uppercase fw-bold"}
                            style={{ width: "50%" }}
                            onClick={() => {
                              toast.info(
                                "products successfully added to your cart"
                              );
                              addToCart(item);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal>  */}
                  <div
                    style={{ position: "relative" }}
                    onClick={(e) => handleDetailsClick(item._id)}
                  >
                    <a>
                      <div
                        style={{
                          backgroundImage: `url(${item.album_cover})`,
                        }}
                        className={s.productImage}
                      />
                    </a>
                    <div
                      className={`d-flex flex-column justify-content-center ${s.product__actions}`}
                      style={{
                        position: "absolute",
                        height: "100%",
                        top: 0,
                        right: 15,
                      }}
                    >
                      <Button
                        className={"p-0 bg-transparent border-0"}
                        onClick={() => {
                          addToCart(item._id);
                          toast.info(
                            "products successfully added to your cart"
                          );
                        }}
                      >
                        <div className={`mb-4 ${s.product__actions__cart}`} />
                      </Button>
                    </div>
                  </div>
                  <div
                    className={s.productInfo}
                    onClick={(e) => handleDetailsClick(item._id)}
                  >
                    <div>
                      <a>
                        <h6
                          className={"fw-bold font-size-base mt-1"}
                          style={{ fontSize: 16 }}
                        >
                          {item.record_name}
                        </h6>
                      </a>
                      <h6 style={{ fontSize: 16 }}>${item.price.toFixed(2)}</h6>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductList;

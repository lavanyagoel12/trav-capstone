// // Checkout.js
import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { useCart } from "./hooks/CartContext";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [record, setRecord] = useState([]);
//   const cartCont = useCart();
//   const cart = cartCont.cart;
//   const updateCart = cartCont.updateCart;

//   useEffect(() => {
//     const fetchRecordData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/records/${id}`);
//         if (!response.ok) {
//           throw new Error("Record data could not be fetched!");
//         }
//         const json_response = await response.json();
//         setRecord(json_response);
//       } catch (error) {
//         console.error("Error fetching record:", error);
//       }
//     };
//     fetchRecordData();
//   }, []);

//   const addToCart = () => {
//     updateCart([...cart, record[0]]);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         className="card"
//         style={{
//           margin: "5%",
//           width: "80%",
//           alignItems: "center",
//           alignSelf: "center",
//         }}
//       >
//         <div className="card-body">
//           <h5 className="card-title">{record[0]?.record_name} Details</h5>
//           <div className="card-text">Genre: {record[0]?.genre}</div>
//           <div className="card-text">Popularity: {record[0]?.popularity}/5</div>
//           <div className="card-text">Condition: {record[0]?.condition}/10</div>
//           <div className="card-text">Price: ${record[0]?.price}</div>
//         </div>

//         <div
//           className="card-footer"
//           style={{ display: "flex", justifyContent: "space-between" }}
//         >
//           <button
//             className="btn btn-primary"
//             onClick={addToCart}
//             style={{ margin: "20px" }}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Toast,
//   ToastBody,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Input,
// import feedbackFields from "components/admin/CRUD/Feedback/feedbackFields";
// import { Formik } from "formik";
// import IniValues from "components/admin/FormItems/iniValues";
// import PreparedValues from "components/admin/FormItems/preparedValues";
// import FormValidations from "components/admin/FormItems/formValidations";
// import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";
import { ToastContainer, toast } from "react-toastify";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import product from "public/images/e-commerce/home/product5.png";
// import productRight from "public/images/e-commerce/details/1-right.png";
// import productCenter from "public/images/e-commerce/details/1-center.png";
// import productLeft from "public/images/e-commerce/details/1-left.png";
// import ratingImg from "public/images/e-commerce/details/stars.svg";
import s from "./Product.module.scss";

// import closeIcon from "public/images/e-commerce/details/close.svg";
// import preloaderImg from "public/images/e-commerce/preloader.gif";
// import axios from "axios";
// import close from "public/images/e-commerce/close.svg";
// import chevronRightIcon from "public/images/e-commerce/details/chevron-right.svg";
// import chevronLeftIcon from "public/images/e-commerce/details/chevron-left.svg";
// import actions from "redux/actions/products/productsFormActions";
// import Head from "next/head";
// import feedbackActions from "redux/actions/feedback/feedbackListActions";
// import ReactImageMagnify from "react-image-magnify";
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext,
// } from "pure-react-carousel";

const ProductDetails = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(1440);
  //   const dispatch = useDispatch();
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
  }, [id]);

  const addToCart = () => {
    console.log("adding to cart:" + record[0]);
    toast.info("record successfully added to your cart");
    updateCart([...cart, record[0]]);
  };

  //   React.useEffect(() => {
  //     dispatch(feedbackActions.doFetch({}));
  //     typeof window !== "undefined" &&
  //       window.addEventListener("resize", () => {
  //         setWidth(window.innerWidth);
  //       });
  //     typeof window !== "undefined" &&
  //       window.setTimeout(() => {
  //         setFetching(false);
  //       }, 1000);
  //   }, []);

  return (
    <>
      <head>
        <title>{record[0]?.record_name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <ToastContainer />
      <Container>
        <Row className={"mb-5"} style={{ marginTop: 32 }}>
          <Col className={"d-flex"}>
            <img src={record[0]?.album_cover} enlargedImagePosition={"over"} />
            {/* {product.image.length > 1 ? (
              <div
                className={`d-flex flex-column h-100 justify-content-between ${s.dMdNone}`}
                style={{ width: 160 }}
              >
                <img src={productRight} width={160} alt="productRight" />
                <img src={productCenter} width={160} alt="productCenter" />
                <img src={productLeft} width={160} alt="productLeft" />
              </div>
            ) : null} */}
          </Col>
          <Col
            // xs={12}
            // lg={product.image.length > 1 ? 5 : 6}
            className={"d-flex flex-column justify-content-between"}
          >
            <div
              className={"d-flex flex-column justify-content-between"}
              style={{ height: 320 }}
            >
              <h6 className={`${s.detailCategory}`}>
                Genre:{" "}
                {record[0]?.artist_genre == "0"
                  ? "Other"
                  : record[0]?.artist_genre.charAt(0).toUpperCase() +
                    record[0]?.artist_genre.slice(1)}
              </h6>
              <h4 className={"fw-bold"}>{record[0]?.record_name}</h4>
              <div className={"d-flex"}>
                <div className={"d-flex flex-column justify-content-between"}>
                  <h6 className={"fw-bold text-muted text-uppercase"}>Price</h6>
                  <h6 className={"fw-bold"}>${record[0]?.price.toFixed(2)}</h6>
                </div>
              </div>
              <div className={"d-flex"}>
                <div
                  className={"d-flex flex-column mr-5 justify-content-between"}
                >
                  <h6 className={"fw-bold text-muted text-uppercase"}>
                    Popularity
                  </h6>
                  <h6 className={"fw-bold"}>
                    {record[0]?.popularity.toFixed(2)}/5
                  </h6>
                </div>
              </div>
            </div>
            <div className={`${s.buttonsWrapper} d-flex`}>
              <Button
                outline
                color={"primary"}
                className={"flex-fill mr-4 text-uppercase fw-bold"}
                style={{ width: "50%" }}
                onClick={() => {
                  addToCart();
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>

        <hr />
        {/* <Row className={"mt-5 mb-5"}>
          <Col sm={12}>
            <h5 className={"fw-bold"}>You may also like:</h5>
          </Col>
        </Row>
        <Row className={"mb-5"} style={{ position: "relative" }}>
          <CarouselProvider
            totalSlides={8}
            visibleSlides={width > 992 ? 4 : width > 576 ? 2 : 1}
            style={{ width: "100%" }}
            infinite
            dragEnabled
            naturalSlideHeight={400}
            naturalSlideWidth={300}
          >
            <ButtonBack
              style={{
                position: "absolute",
                top: "35%",
                zIndex: 99,
                left: -20,
              }}
              className={"btn bg-transparent border-0 p-0"}
            >
              <img src={chevronLeftIcon} alt={"chevronLeftIcon"} />
            </ButtonBack>
            <Slider>
              {products.map((c, index) => (
                <Slide index={index} key={index}>
                  <Col className={`${s.product}`}>
                    <Link
                      href={`/products/afaf98d5-4060-4408-967b-c4f4af3d186${
                        index + 1
                      }`}
                    >
                      <a>
                        <img
                          src={c.img}
                          className={"img-fluid"}
                          style={{ width: "100%" }}
                          alt={"img"}
                        />
                      </a>
                    </Link>
                    <p className={"mt-3 text-muted mb-0"}>Category</p>
                    <Link
                      href={`/products/afaf98d5-4060-4408-967b-c4f4af3d1861`}
                    >
                      <a>
                        <h6
                          className={"fw-bold font-size-base mt-1"}
                          style={{ fontSize: 16 }}
                        >
                          Awesome Product Name
                        </h6>
                      </a>
                    </Link>
                    <h6 style={{ fontSize: 16 }}>$70</h6>
                  </Col>
                </Slide>
              ))}
            </Slider>
            <ButtonNext
              style={{
                position: "absolute",
                top: "35%",
                zIndex: 99,
                right: -20,
              }}
              className={"btn bg-transparent border-0 p-0"}
            >
              <img src={chevronRightIcon} alt={"chevronRightIcon"} />
            </ButtonNext>
          </CarouselProvider>
        </Row> */}
      </Container>
    </>
  );
};

export default ProductDetails;

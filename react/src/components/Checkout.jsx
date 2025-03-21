// // Checkout.js
// import React from "react";

// const Checkout = ({ total }) => {
//   const handleCheckout = () => {
//     alert(`Checkout successful! Total: $${total.toFixed(2)}`);
//   };

//   return (
//     <div>
//       <h2>Checkout: {total.toFixed(2)}</h2>
//       <button onClick={handleCheckout}>Proceed to Checkout</button>
//     </div>
//   );
// };

// export default Checkout;
// src/CheckoutPage.js
import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  Table,
} from "reactstrap";
import s from "./Billing.module.scss";
import cs from "./Cart.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import countryList from "react-select-country-list";
import { useCart } from "./hooks/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const options = useMemo(() => countryList().getData(), []);
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    country: "",
    city: "",
    street: "",
    aptSuite: "",
    phone: "",
    zipCode: "",
    email: "",
    cardName: "",
    cardNum: "",
    expMonth: "01",
    expYear: "2025",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const processPayment = async () => {
    // Gather form data into a dictionary
    const paymentData = { customerInfo: formData, cartInfo: cart };
    console.log("Payment Data:", paymentData);

    try {
      // TODO: Make a POST request to the API to add the sock
      const response = await fetch(`http://localhost:3000/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Clear the forms
      setFormData({
        firstName: "",
        country: "",
        city: "",
        street: "",
        aptSuite: "",
        phone: "",
        zipCode: "",
        email: "",
        cardName: "",
        cardNum: "",
        expMonth: "01",
        expYear: "2025",
        cvv: "",
      });
      updateCart([]);
      // Notify user
      toast.success("Order placed successfully!");
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  const removeFromCart = (index) => {
    const newCartItems = cart.filter((_, i) => i !== index);
    updateCart(newCartItems);
  };

  const handleDetailsClick = (recordId) => {
    console.log("handleDetails clicked: " + recordId);
    props.setIsCartOpen(false);
    navigate("/details/" + recordId);
  };

  return (
    <Container className={"mb-5"} style={{ marginTop: 32 }}>
      <Row className={"mt-5"}>
        <Col xs={12} lg={12}>
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
                    <tr className={"mt-2"} key={index}>
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
                            toast.info("Product successfully removed");
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
          <section
            className={cs.cartTotal}
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div className={"d-flex"}>
              <h5 className={"fw-bold"} style={{ marginRight: 63 }}>
                Total:
              </h5>
              <h5 className={"fw-bold"}>${total.toFixed(2)}</h5>
            </div>
          </section>
        </Col>
      </Row>
      <Row className={"my-5"}>
        <Col sm={12}>
          <h3 className={"fw-bold"}>Billing Info</h3>
        </Col>
      </Row>
      <Row className={"mt-5"}>
        <Col lg={8} xs={12}>
          <h3 className={"fw-bold mb-5"}>Billing Address</h3>
          <Form className={s.form}>
            <FormGroup>
              <Label for="firstName" className="fw-bold">
                First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                className="w-100"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup className="d-flex">
              <div className="flex-fill mr-5">
                <Label for="country" className="fw-bold">
                  Country
                </Label>
                <Input
                  type="select"
                  name="country"
                  id="country"
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  {options.map((item, idx) => (
                    <option key={idx}>{item.label}</option>
                  ))}
                </Input>
              </div>
              <div className="flex-fill">
                <Label for="city" className="fw-bold">
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </FormGroup>
            <FormGroup className="d-flex">
              <div className="flex-fill mr-5">
                <Label for="street" className="fw-bold">
                  Street
                </Label>
                <Input
                  type="text"
                  name="street"
                  id="street"
                  value={formData.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-fill">
                <Label for="aptSuite" className="fw-bold">
                  Apt / Suite / Other
                </Label>
                <Input
                  type="text"
                  name="aptSuite"
                  id="aptSuite"
                  value={formData.aptSuite}
                  onChange={handleInputChange}
                />
              </div>
            </FormGroup>
            <FormGroup className={`d-flex`}>
              <div className="flex-fill mr-5">
                <Label for="phone" className="fw-bold">
                  Phone
                </Label>
                <Input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder={""}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-fill">
                <Label for="zipCode" className="fw-bold">
                  ZIP Code
                </Label>
                <Input
                  type="number"
                  name="zipCode"
                  id="zipCode"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="email" className="fw-bold">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="w-100"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col lg={4} xs={12}>
          <section className={s.paymentInfo}>
            <h3 className={"fw-bold mb-0"}>Credit Card Info</h3>
            <Form className={`${s.form} mt-4`}>
              <FormGroup>
                <Label for="cardName" className="fw-bold">
                  Name On Card
                </Label>
                <Input
                  type="text"
                  name="cardName"
                  id="cardName"
                  className="w-100"
                  value={formData.cardName}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="cardNum" className="fw-bold">
                  Card Number
                </Label>
                <Input
                  type="number"
                  name="cardNum"
                  id="cardNum"
                  className="w-100"
                  value={formData.cardNum}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className={`d-flex`}>
                <div className="flex-fill mr-2">
                  <Label for="expMonth" className="fw-bold">
                    Exp. Month
                  </Label>
                  <Input
                    type="select"
                    name="expMonth"
                    id="expMonth"
                    style={{ padding: "10px 24px" }}
                    value={formData.expMonth}
                    onChange={handleInputChange}
                  >
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Input>
                </div>
                <div className="flex-fill">
                  <Label for="expYear" className="fw-bold">
                    Exp. Year
                  </Label>
                  <Input
                    type="select"
                    name="expYear"
                    id="expYear"
                    style={{ padding: "10px 24px" }}
                    value={formData.expYear}
                    onChange={handleInputChange}
                  >
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                  </Input>
                </div>
              </FormGroup>
              <FormGroup className={"d-flex"}>
                <div className="mr-4">
                  <Label for="cvv" className="fw-bold">
                    CVV
                  </Label>
                  <Input
                    title="Do not show this to anybody"
                    maxLength={3}
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder={"123"}
                    className={"info"}
                    style={{ maxWidth: "110px", minWidth: "110px" }}
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>
              <Button
                color={"primary"}
                className={`${s.checkOutBtn} text-uppercase mt-auto fw-bold`}
                onClick={processPayment}
              >
                PLACE ORDER
              </Button>
            </Form>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

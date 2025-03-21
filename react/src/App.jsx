import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  TextField,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import CheckoutPage from "./components/CheckoutPage";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider, useCart } from "./components/hooks/CartContext";
import GenreProductList from "./components/GenreProductList";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0.0);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleCheckoutClick = () => {
    navigate("/checkout");
  };
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="end" color="inherit" onClick={toggleCart}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleHomeClick}>
            <Badge badgeContent={0} color="secondary">
              <HomeIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleCheckoutClick}>
            <Badge badgeContent={0} color="secondary">
              <ShoppingCartCheckoutIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/genre/:genre" element={<GenreProductList />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route
          path="/checkout"
          element={<Checkout setIsCartOpen={setIsCartOpen} />}
        />
      </Routes>
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Cart setIsCartOpen={setIsCartOpen} setTotal={setTotal} />
      </Drawer>
    </div>
  );
};

export default App;

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
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider, useCart } from "./components/hooks/CartContext";
import GenreProductList from "./components/GenreProductList";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleHomeClick = () => {
    navigate("/");
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
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/genre/:genre" element={<GenreProductList />} />
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Cart />
        <Checkout total={total} />
      </Drawer>
    </div>
  );
};

export default App;

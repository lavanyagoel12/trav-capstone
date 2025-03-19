import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  TextField,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckoutPage from "./components/CheckoutPage";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider, useCart } from "./components/hooks/CartContext";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={toggleCart}>
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <HomePage></HomePage>
        <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
          <Cart />
          <Checkout total={total} />
        </Drawer>
      </div>
    </CartProvider>
  );
};

export default App;

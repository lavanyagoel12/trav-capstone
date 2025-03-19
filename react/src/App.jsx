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

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="end" color="inherit" onClick={toggleCart}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px" }}
        />
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </Box>
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        <Checkout total={total} />
      </Drawer>
    </div>
  );
};

export default App;

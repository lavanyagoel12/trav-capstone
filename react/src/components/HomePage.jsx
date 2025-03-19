import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Paper,
  Button,
  Drawer,
} from "@mui/material";
import { useCart } from "./hooks/CartContext";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const total = 0;

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/records`);
        if (!response.ok) {
          throw new Error("Record data could not be fetched!");
        }
        const json_response = await response.json();
        setRecords(json_response);
        console.log(records);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchRecordData();
  }, []);

  const addToCart = (product) => {
    updateCart([...cart, product]);
  };



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredRecords(
      records.filter((product) =>
        product.record_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <>
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
          style={{ margin: "20px", width: "100%" }}
        />
        <ProductList products={filteredRecords} addToCart={addToCart} />
      </Box>
    </>
    // <div>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography variant="h6" style={{ flexGrow: 1 }}>
    //         My App
    //       </Typography>
    //       <Button color="inherit">Home</Button>
    //       <Button color="inherit">About</Button>
    //       <Button color="inherit">Contact</Button>
    //     </Toolbar>
    //   </AppBar>
    //   <Container maxWidth="sm">
    //     <Box
    //       display="flex"
    //       flexDirection="column"
    //       alignItems="center"
    //       justifyContent="center"
    //       minHeight="100vh"
    //     >
    //       <Typography variant="h4" component="h1" gutterBottom>
    //         Product Search
    //       </Typography>
    //       <TextField
    //         label="Search Products"
    //         variant="outlined"
    //         fullWidth
    //         margin="normal"
    //         value={searchTerm}
    //         onChange={handleSearchChange}
    //       />
    //       <Paper elevation={3} style={{ width: "100%", marginTop: "16px" }}>
    //         <List>
    //           {filteredItems.map((item) => (
    //             <ListItem key={item.id}>
    //               <ListItemText primary={item.name} />
    //             </ListItem>
    //           ))}
    //         </List>
    //       </Paper>
    //     </Box>
    //   </Container>
    // </div>
  );
};

export default HomePage;

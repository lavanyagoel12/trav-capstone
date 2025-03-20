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
import Grid from "@mui/material/Grid2";
import { useCart } from "./hooks/CartContext";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";
import seedrandom from "seedrandom";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const genresArray = ["Jazz", "Hip Hop", "Country", "Classical", "R&B"];
  const cartCont = useCart();
  const cart = cartCont.cart;
  const updateCart = cartCont.updateCart;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [featuredRecords, setFeaturedRecords] = useState([]);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const total = 0;
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchFeaturedRecords = async () => {
      try {
        const response = await fetch(`http://localhost:3000/featured`);
        if (!response.ok) {
          throw new Error("Record data could not be fetched!");
        }
        const json_response = await response.json();

        for (let i = json_response.length - 1; i > 0; i--) {
          const j = Math.floor(seedrandom(Math.random(42, 34, 26)) * (i + 1));
          [json_response[i], json_response[j]] = [
            json_response[j],
            json_response[i],
          ];
        }
        setFeaturedRecords(json_response.slice(0, 3));
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchFeaturedRecords();
  }, []);

  const handleGenreClick = (genre) => {
    navigate("/genre/" + genre);
  };

  const handleSearchChange = () => {
    if (searchQuery != "") {
      toast.info("search submitted, please wait while your results load");
      setFilteredRecords(
        records.filter((product) =>
          product.record_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        minHeight="100vh"
      >
        <ToastContainer />
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onBlur={handleSearchChange}
          style={{ margin: "20px", width: "90%", alignSelf: "start" }}
        />
        {searchQuery ? (
          <ProductList heading="Search Results" products={filteredRecords} />
        ) : (
          // put featured and categories here
          <>
            <ProductList heading="Featured" products={featuredRecords} />
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              style={{ alignSelf: "center" }}
            >
              {genresArray.map((genre) => (
                <Grid key={genre} size={{ xs: 4, sm: 4, md: 6 }}>
                  {/* <Item>{index + 1}</Item> */}
                  <div
                    className="card bg-success"
                    style={{ alignItems: "center", width: "100%" }}
                    onClick={(e) => handleGenreClick(e.target.innerText)}
                  >
                    {genre}
                  </div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
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

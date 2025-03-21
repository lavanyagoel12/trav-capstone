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
import { Container as ContainerR, Row, Col } from "reactstrap";
import s from "./Categories.module.scss";
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
  const [searching, setSearching] = useState(false);
  const [genresArray, setGenresArray] = useState([]);
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
    const fetchGenreData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/genres`);
        if (!response.ok) {
          throw new Error("Genre data could not be fetched!");
        }
        const json_response = await response.json();
        setGenresArray(json_response);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenreData();
  }, []);

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
    setSearching(false);
    if (searchQuery != "") {
      // toast.info("search submitted, please wait while your results load");
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
          onFocus={(e) => setSearching(true)}
          style={{ margin: "20px", width: "90%", alignSelf: "start" }}
        />
        {searchQuery ? (
          <>
            {filteredRecords.length > 0 && !searching ? (
              <ProductList
                heading="Search Results"
                products={filteredRecords}
              />
            ) : (
              <>
                {searching ? (
                  <ProductList
                    heading="Click outside the search box when you are finished typing."
                    products={[]}
                  />
                ) : (
                  <ProductList
                    heading="Sorry, no records match your search."
                    products={filteredRecords}
                  />
                )}
              </>
            )}
          </>
        ) : (
          // put featured and categories here
          <>
            <ProductList heading="Featured" products={featuredRecords} />
            <ContainerR className={s.bannersContainer}>
              <Row>
                {genresArray?.map((genre) => (
                  <Col md={6} xs={12} onClick={(e) => handleGenreClick(genre)}>
                    <div className={`${s.livingRoomBanner}`}>
                      <div className={s.textContent}>
                        <div>
                          <strong>
                            {genre == "0"
                              ? "Other"
                              : genre.charAt(0).toUpperCase() + genre.slice(1)}
                          </strong>
                          <b>View Records</b>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </ContainerR>
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

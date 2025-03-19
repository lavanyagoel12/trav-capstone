import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    // fetch(`${import.meta.env.VITE_SOCKS_API_URL}/search`, {
    //   method: "POST",
    //   body: JSON.stringify({ color: searchTerm }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response data
    //     props.setData(data);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error(error);
    //   });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <TextField
        required
        id="search"
        name="search"
        label="Search Records"
        variant="standard"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button color="primary" className="btn btn-outline-success" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;

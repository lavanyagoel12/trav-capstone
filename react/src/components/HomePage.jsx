import React, { useState } from "react";
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
} from "@mui/material";

const items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
  { id: 3, name: "Item Three" },
  { id: 4, name: "Item Four" },
  { id: 5, name: "Item Five" },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Product Search
          </Typography>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Paper elevation={3} style={{ width: "100%", marginTop: "16px" }}>
            <List>
              {filteredItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;

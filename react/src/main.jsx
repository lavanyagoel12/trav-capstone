import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CartProvider } from "./components/hooks/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);

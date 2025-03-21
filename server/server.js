import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = 3000;
const FLASK_SERVER_URL = "http://localhost:5000/run-model"; // Adjust the URL if your Flask server runs on a different port

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Use CORS middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/run-model", async (req, res) => {
  const cartItems = req.body.cart_items;

  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid cart items" });
  }

  try {
    const response = await axios.post(FLASK_SERVER_URL, {
      cart_items: cartItems,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with Flask server:", error.message);
    res.status(500).json({ error: "Failed to process cart items" });
  }
});

app.get("/records", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const recordsArray = await collection.find({}).toArray();
    console.log(recordsArray);
    res.json(recordsArray);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

app.get("/records/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const recordsArray = await collection
      .find({ _id: new ObjectId(id) })
      .toArray();
    console.log(recordsArray);
    res.json(recordsArray);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch record by ID" });
  }
});

app.get("/genres/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const genresArray = await collection.find({ genre: genre }).toArray();
    console.log(genresArray);
    res.json(genresArray);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

app.get("/featured", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const featuredArray = await collection
      .find({ popularity: { $gt: 4 } })
      .toArray();
    console.log(featuredArray);
    res.json(featuredArray);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch featured records" });
  }
});

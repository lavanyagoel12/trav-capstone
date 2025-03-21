import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
const PORT = 3000;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(express.json());

app.post("/order", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("orders");
    const order = req.body;
    console.log("order: " + req.body);
    const orders = await collection.insertOne(order);
    console.log("Creating order: ", order);
    res.status(200).send({ message: "Order created!" });
    console.log("Order created successfully!");
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Error adding order");
  }
});

app.get("/records", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("record_data");
    const recordsArray = await collection.find({}).toArray();
    console.log(recordsArray);
    res.json(recordsArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/records/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("record_data");
    const recordsArray = await collection
      .find({ _id: new ObjectId(id) })
      .toArray();
    console.log(recordsArray);
    res.json(recordsArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/genres/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("record_data");
    const genresArray = await collection
      .find({ artist_genre: genre })
      .toArray();
    console.log(genresArray);
    res.json(genresArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/genres", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("record_data");
    const genresArray = await collection.distinct("artist_genre");
    console.log(genresArray);
    res.json(genresArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/featured", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("record_data");
    const featuredArray = await collection
      .find({ popularity: { $gt: 4 } })
      .toArray();
    console.log(featuredArray);
    res.json(featuredArray);
  } catch (e) {
    console.log(e);
  }
});

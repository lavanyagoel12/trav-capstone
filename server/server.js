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

app.get("/records", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("genre_data");
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
    const collection = db.collection("genre_data");
    const recordsArray = await collection.find({ _id: id }).toArray();
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
    const collection = db.collection("genre_data");
    const genresArray = await collection.find({ genre: genre }).toArray();
    console.log(genresArray);
    res.json(genresArray);
  } catch (e) {
    console.log(e);
  }
});

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

app.get("/api/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planetsArray = await collection.find({}).toArray();
    console.log(planetsArray);
    res.json(planetsArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/planets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planet = await collection.findOne({ id: parseInt(id) });
    console.log(planet);
    res.json(planet);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films_planets");
    const planetfilmsList = await collection
      .find({ planet_id: parseInt(id) })
      .toArray();
    const filmsIds = planetfilmsList.flatMap((planet) => planet.film_id);
    const filmsCollection = db.collection("films");
    const films = await filmsCollection
      .find({ id: { $in: filmsIds } })
      .toArray();
    console.log(films);
    res.json(films);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const characters = await collection
      .find({ homeworld: parseInt(id) })
      .toArray();
    console.log(characters);
    res.json(characters);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films");
    const filmsArray = await collection.find({}).toArray();
    console.log(filmsArray);
    res.json(filmsArray);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/films/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films");
    const film = await collection.findOne({ id: parseInt(id) });
    console.log(film);
    res.json(film);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/films/:id/characters", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films_characters");
    const filmCharactersList = await collection
      .find({ film_id: parseInt(id) })
      .toArray();
    const characterIds = filmCharactersList.flatMap(
      (film) => film.character_id
    );

    const characterCollection = db.collection("characters");
    const characters = await characterCollection
      .find({ id: { $in: characterIds } })
      .toArray();
    console.log(characters);

    res.json(characters);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films_planets");
    const filmPlanetsList = await collection
      .find({ film_id: parseInt(id) })
      .toArray();
    const planetIds = filmPlanetsList.flatMap((film) => film.planet_id);

    const planetCollection = db.collection("planets");
    const planets = await planetCollection
      .find({ id: { $in: planetIds } })
      .toArray();
    console.log(planets);
    res.json(planets);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const charactersArray = await collection.find({}).toArray();
    console.log(charactersArray);
    res.json(charactersArray);
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const character = await collection.findOne({ id: parseInt(id) });
    console.log(character);
    res.json(character);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films_characters");
    const characterFilmsList = await collection
      .find({ character_id: parseInt(id) })
      .toArray();
    const filmIds = characterFilmsList.flatMap(
      (character) => character.film_id
    );
    const filmCollection = db.collection("films");
    const films = await filmCollection.find({ id: { $in: filmIds } }).toArray();
    console.log(films);
    res.json(films);
  } catch (e) {
    console.log(e);
  }
});

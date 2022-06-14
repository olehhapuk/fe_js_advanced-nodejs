const express = require('express');
const volleyball = require('volleyball');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

// Custom file imports

const app = express();
const dbClient = new MongoClient(process.env.DB_URI);

dbClient
  .connect()
  .then(() => {
    console.log('DB Connected');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(express.json());
app.use(volleyball);

app.post('/api/v1/cats', async (req, res) => {
  try {
    const { insertedId } = await dbClient
      .db()
      .collection('cats')
      .insertOne(req.body);

    const newCat = await dbClient.db().collection('cats').findOne({
      _id: insertedId,
    });

    res.json(newCat);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = app;

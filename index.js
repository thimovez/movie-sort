const fs = require('node:fs');
const path = require('node:path');
const csv = require('csv-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs")

app.get('/', (req, res) => {
  try {
    const results = [];
    fs.createReadStream(path.resolve(__dirname, "movies.csv"), {encoding: 'utf-8'})
    .pipe(csv())
    .on('data', (chunk) => {
      results.push(chunk);
    })
    .on('end', () => {
      // res.render("index", {movies: results, async: true});  
      res.status(200).json(results);
    })
.   on('error', (err) => {POST
      throw new Error(err);
    });
  } catch (err) {
    throw new Error(err);
  }
});


app.get('/sort', (req, res) => {
  try {
    const results = [];
    fs.createReadStream(path.resolve(__dirname, "movies.csv"), {encoding: 'utf-8'})
    .pipe(csv())
    .on('data', (chunk) => {
      results.push(chunk);
    })
    .on('end', () => {
      results.sort((a, b) => a.popularity - b.popularity);
      res.status(200).send(results);
    })
.   on('error', (err) => {POST
      throw new Error(err);
    });
  } catch (err) {
    throw new Error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

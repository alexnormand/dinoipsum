const express = require('express');
const cors = require('cors');
const dinoipsum = require('./dinoipsum');
const compression = require('compression');
const { query } = require('express-validator/check');

const PORT = process.env.PORT || 3000;
const FORMATS = ['json', 'text', 'html'];

const filter = (req, res) => {
  return /json|text|javascript|svg|html/.test(res.getHeader('Content-Type'));
};

const app = express();

app.use(compression({ filter }));
app.get(
  '/api',
  cors(),
  query('format').isIn(FORMATS),
  query('paragraphs').isNumeric(),
  query('words').isNumeric(),
  (req, res) => {
  const options = {
    ...req.query
  };
  req.query.format = req.query.format || 'html';
  res.type(req.query.format);
  const dinos = dinoipsum.getDinos(req.query);

  res.end(dinos);

});

app.listen(PORT, () => console.log(`listening on port ${PORT}.`))
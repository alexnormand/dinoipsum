const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.redirect(301, 'https://dinoipsum.com' + req.originalUrl);
});

app.listen(process.env.PORT || 3000);
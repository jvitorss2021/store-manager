const express = require('express');
const router = require('./router');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(router);

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;

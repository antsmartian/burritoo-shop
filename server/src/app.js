const express = require('express');
const app = express();
const v1Orders = require('./api/routes/v1/orders');
const v1burritos = require('./api/routes/v1/burritos');
const bodyParser = require('body-parser');
const {APIError} = require("./api/models/error");
const apiAuth = require("./api/middlewares/apiAuth")


// Parse URL-encoded bodies and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//add auth
app.use('/', apiAuth);

app.use('/v1', v1Orders);
app.use('/v1',v1burritos)

// Error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = { app, server };


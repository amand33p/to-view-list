const express = require('express');
require('express-async-errors');
require('./database/db');
const cors = require('cors');
const middleware = require('./utils/middleware');
const entryRouter = require('./controllers/entries');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;

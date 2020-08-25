const mongoose = require('mongoose');
const { MONGODB_URI: url } = require('../utils/config');

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) =>
    console.error('error connecting to MongoDB: ', error.message)
  );

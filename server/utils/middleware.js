const unknownEndpointHandler = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid token' });
  }

  next(error);
};

module.exports = {
  unknownEndpointHandler,
  errorHandler,
};

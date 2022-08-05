const errorHandler = (err, req, res, next) => {
  if (Array.isArray(err)) {
    res.status(422).json({ error: err });
  } else {
    res.status(400).json({ error: err.message });
  }
};

module.exports = errorHandler;

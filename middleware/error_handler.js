const errorHandler = (err, req, res, next) => {
  if (err.message === "validation failed") {
    res.status(422).json({ error: err.cause });
  } else if (err.message === "unauthorized access") {
    res.status(401).json({ error: err.message });
  } else {
    res.status(400).json({ error: err.message });
  }
};

module.exports = errorHandler;

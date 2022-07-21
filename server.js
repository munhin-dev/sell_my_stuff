const express = require("express");
const errorHandler = require("./middleware/error_handler");
const session = require("express-session");
const { sessionConfig } = require("./config");
const router = require("./routes");
const app = express();

app.use(express.json());
app.use(session(sessionConfig));
app.use(router);
app.use(errorHandler);
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
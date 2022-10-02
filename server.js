const express = require("express");
const errorHandler = require("./middleware/error_handler");
const session = require("express-session");
const { sessionConfig } = require("./config");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.use(express.json());
app.use(session(sessionConfig()));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(router);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

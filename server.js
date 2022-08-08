const express = require("express");
const errorHandler = require("./middleware/error_handler");
const session = require("express-session");
const path = require("path");
const { sessionConfig } = require("./config");
const favicon = require("express-favicon");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(session(sessionConfig()));
app.use(favicon(path.join(__dirname, "/client/build/favicon.ico")));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

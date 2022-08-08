const express = require("express");
const errorHandler = require("./middleware/error_handler");
const session = require("express-session");
const { sessionConfig, corsConfig } = require("./config");
const router = require("./routes");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(cors(corsConfig));
app.use(express.json());
app.set("trust proxy", 1);
app.use(session(sessionConfig));
app.use(router);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

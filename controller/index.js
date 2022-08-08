const order = require("./order");
const checkout = require("./checkout");
const cart = require("./cart");
const user = require("./user");
const product = require("./product");
const address = require("./address");

const handleIndexHtml = (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
}
module.exports = { order, checkout, cart, product, user, address, handleIndexHtml};

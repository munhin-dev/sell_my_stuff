const { stripeKey } = require("../config");
const stripe = require("stripe")(stripeKey);
const db = require("../db");

class Checkout {
  static async createSession(items, id) {
    const address = await db.query("Select * FROM customer_address WHERE id = $1", [id]);
    if (address.rows[0] === 0) throw new Error("Address not found");
    const dbRes = await db.query("SELECT id, name, price, quantity FROM product");
    const products = new Map(dbRes.rows.map((product) => [product.id, { price: product.price * 100, name: product.name, quantity: product.quantity }]));
    const session = await stripe.checkout.sessions.create({
      payment_intent_data: { metadata: { id } },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        const storeItem = products.get(item.id);
        if (storeItem.quantity < item.quantity) throw new Error("Insufficient Inventory");
        return {
          price_data: {
            currency: "myr",
            product_data: { name: storeItem.name },
            unit_amount: storeItem.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cart",
    });
    return session.url;
  }

  static async handlePayment(id) {
    const cartItems = await db.query("SELECT * from cart_item where customer_id = $1", [id]);
    const content = cartItems.rows[0].content;
    const promises = JSON.parse(content).map(({ item, quantity }) => db.query("UPDATE Product SET quantity = quantity - $1 WHERE id =$2", [quantity, item.id]));
    Promise.all(promises).then(async () => {
      await db.query("INSERT into order_details (customer_id, content, shipped) VALUES ($1, $2, $3)", [id, content, false]);
      await db.query("DELETE from cart_item where customer_id = $1", [id]);
    });
  }
}

module.exports = Checkout;

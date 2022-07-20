const { stripeKey } = require("../config");
const stripe = require("stripe")(stripeKey);
const db = require("../db");

class Checkout {
  static async createSession(items, id) {
    const dbRes = await db.query("SELECT id, name, price FROM product");
    const products = new Map(dbRes.rows.map((product) => [product.id, { price: product.price * 100, name: product.name }]));
    const session = await stripe.checkout.sessions.create({
      payment_intent_data: { metadata: { id } },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        const storeItem = products.get(item.id);
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

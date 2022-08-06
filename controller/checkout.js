const { stripeKey, transporter } = require("../config");
const stripe = require("stripe")(stripeKey);
const models = require("../models");

const checkout = {
  async handleCheckout(req, res, next) {
    try {
      const address = await models.address.getByCustomerId(req.session.userId);
      if (!address) throw new Error("Address not found");
      const allProducts = await models.product.getAll();
      const products = new Map(
        allProducts.map((product) => [
          product.id,
          {
            price: product.price * 100,
            name: product.name,
            quantity: product.quantity,
          },
        ])
      );
      const { url } = await stripe.checkout.sessions.create({
        payment_intent_data: { metadata: { id: req.session.userId } },
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map((item) => {
          const storeItem = products.get(item.id);
          if (storeItem.quantity < item.quantity)
            throw new Error("Insufficient Inventory");
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

      res.status(200).json({ url });
    } catch (error) {
      next(error);
    }
  },

  async handleSuccess(req, res, next) {
    const event = req.body.type;
    if (event === "payment_intent.succeeded") {
      const { id } = req.body.data.object.metadata;
      try {
        const cart = await models.cart.get(id);
        const updateInventory = JSON.parse(cart.content).map(({ item, quantity }) => models.product.updateInventory(quantity, item.id));
        const createOrder = models.order.create(id, cart.content);
        const deleteCart = models.cart.delete(id);
        await Promise.all([...updateInventory, createOrder, deleteCart]);
        await transporter.sendMail({
          from: "test-123-123-123@outlook.com",
          to: "obh555@gmail.com",
          subject: "Sending email with node.js",
          text: "Thank you for purchasing with SellMyStuff. Your payment has been successfully processed, please allow 2-3 days for item to be shipped.",
        });
        res.status(200).end();
      } catch (error) {
        next(error);
      }
    }
  },
};

module.exports = checkout;

const { stripeKey, transporter, mailContent, domain } = require("../config");
const stripe = require("stripe")(stripeKey);
const models = require("../models");
require("dotenv").config();

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
        success_url: `${domain()}/success`,
        cancel_url: `${domain()}/cart`,
      });
      res.status(200).json({ url });
    } catch (err) {
      next(err);
    }
  },

  async handleSuccess(req, res, next) {
    const event = req.body.type;
    if (event === "payment_intent.succeeded") {
      const { id } = req.body.data.object.metadata;
      try {
        const cart = await models.cart.get(id);
        const updateInventory = JSON.parse(cart.content).map(
          ({ item, quantity }) =>
            models.product.updateInventory(quantity, item.id)
        );
        const getUser = models.user.getById(id);
        const createOrder = models.order.create(id, cart.content);
        const deleteCart = models.cart.delete(id);
        const [user, order] = await Promise.all([
          getUser,
          createOrder,
          ...updateInventory,
          createOrder,
          deleteCart,
        ]);
        await transporter.sendMail({
          from: process.env.EMAIL_ADDRESS,
          to: user.email,
          subject: "Thank you! Your order is confirmed.",
          text: mailContent(order.id, user.first_name),
        });
        res.status(200).json({ message: "Payment processed successfully." });
      } catch (err) {
        next(err);
      }
    }
  },
};

module.exports = checkout;

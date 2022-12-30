require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailContent = (order_number, name) =>
  `\nConfirmation Number: ${order_number}\nHello ${name},\n\nWe're happy to let you know that we've received your order.\n\nOnce your package ships, we will send you an email with a tracking number and link so you can see the movement of your package.\n\nIf you have any questions, contact us here by replying to this email directly!\n\nWe are here to help!\n\nThe SellMyStuff Team`;

const sessionConfig = () => {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  };
};

const domain = () =>
  process.env.NODE_ENV === "production"
    ? "https://sellmystuff.fly.dev"
    : "http://localhost:3000";

const stripeKey = process.env.STRIPE_KEY;

module.exports = { sessionConfig, stripeKey, transporter, mailContent, domain };

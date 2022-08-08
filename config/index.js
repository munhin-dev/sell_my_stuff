const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: "sellmystuff456852@zohomail.com",
    pass: "NeSh31212@",
  },
});

const mailContent = (order_number, name) => `\nConfirmation Number: ${order_number}\nHello ${name},\n\nWe're happy to let you know that we've received your order.\n\nOnce your package ships, we will send you an email with a tracking number and link so you can see the movement of your package.\n\nIf you have any questions, contact us here by replying to this email directly!\n\nWe are here to help!\n\nThe SellMyStuff Team`;

const sessionConfig = {
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 60 * 60 * 24 * 1000,
    secure: true, 
    sameSite: "none" 
  },
};

const stripeKey = "sk_test_51LNPqSEzYab6HLIKoQ36q0fKkNLrGQLoNkUOepySj0xIeEyuH2ELacSZ1e1IFvxhRXhnjuMPFcnowxWEuBzFcRcz00ln3zeJhj";

const corsConfig = {
  origin: process.env.NODE_ENV === "production" ? "https://sell-my-stuff-456852.surge.sh" : "http://localhost:3000",
  credentials: true,
};

module.exports = { sessionConfig, stripeKey, transporter, mailContent, corsConfig };

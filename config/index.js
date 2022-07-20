const sessionConfig = {
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};

const stripeKey = "sk_test_51LNPqSEzYab6HLIKoQ36q0fKkNLrGQLoNkUOepySj0xIeEyuH2ELacSZ1e1IFvxhRXhnjuMPFcnowxWEuBzFcRcz00ln3zeJhj";

module.exports = { sessionConfig, stripeKey };

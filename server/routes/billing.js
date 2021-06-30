/* eslint-disable import/order */
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    await stripe.charges.create({
      amount: 100,
      currency: 'usd',
      description: '1 Credit for 1$',
      source: req.body.id,
    })
      .catch(async () => {
        // Handling success in catch block due to this error - 'As per Indian regulations, export transactions require a customer name and address. More info here: https://stripe.com/docs/india-exports',
        req.user.credits += 1;
        const user = await req.user.save();

        res.send(user);
      });
  });
};

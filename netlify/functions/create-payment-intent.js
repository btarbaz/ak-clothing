// importing dotenv in process.env config()
require('dotenv').config();

// importing spripe and attaching secretkey
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// SERVERLESS FUNCTION
/*
1. Event fires.
2. we get amount from event.body.
3. we try stripe.paymentIntents create a  payment with object{amount,currency,payment_method_types}
4. if success return code 200 and body: stripeIntent.
5. if failed return code 4000 and body: error
*/

// exporting function
exports.handler = async event => {
  try {
    const { amount } = JSON.parse(event.body);

    const stripePaymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ stripePaymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};

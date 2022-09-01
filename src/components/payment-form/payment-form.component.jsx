import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles';
import { BUTTON_CLASS_TYPE } from '../button/button.component';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { clearCartItems } from '../../store/cart/cart.action';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // paymentHandler when form submit
  const paymentHandler = async e => {
    e.preventDefault();

    // check if nothing
    if (!stripe || !elements) {
      return;
    }

    setIsPaymentProcessing(true);
    // fetching serverless function which we created
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json', // app is in json
      },
      body: JSON.stringify({ amount: amount * 100 }), // giving amount * by 100 bcz stripe takes with unit
    }).then(res => res.json());

    // const { client_secret } = response.stripePaymentIntent;
    const {
      stripePaymentIntent: { client_secret },
    } = response;

    // confirmCardPayment requires client_secret and data ( method in which card is our type so get CardElement from app)
    const paymentRequest = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement), // using elements in our app getting CardElement which we are using
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsPaymentProcessing(false);
    // validation if success or error
    if (paymentRequest.error) {
      alert(paymentRequest.error);
    } else {
      if (paymentRequest.paymentIntent.status === 'succeeded') {
        dispatch(clearCartItems());
        alert('Payment Successful !');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          isLoading={isPaymentProcessing}
          disabled={amount === 0}
          /* if ispaymentproc is true then disable */
          buttonType={BUTTON_CLASS_TYPE.inverted}
        >
          PAY NOW
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;

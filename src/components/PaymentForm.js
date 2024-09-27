import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    const payload = {
      email,
      amount,
    };

    try {
      const response = await axios.post('http://localhost:5000/payment', payload);
      setIsLoading(false);
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('Payment failed.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('Error processing payment.');
    }
  };

  return (
    <div className="payment-form">
      <h2>Make a Payment</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {success && <p>Payment successful!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PaymentForm;

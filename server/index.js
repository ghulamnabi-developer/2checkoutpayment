const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TCO_MERCHANT_CODE = process.env.TCO_MERCHANT_CODE;
const TCO_SECRET_KEY = process.env.TCO_SECRET_KEY;

app.post('/payment', async (req, res) => {
  const { email, amount } = req.body;

  // Prepare the payload for the payment request
  const payload = {
    sellerId: TCO_MERCHANT_CODE,
    amount: amount,
    currency: 'USD', // Modify this based on your currency
    email: email,
    paymentMethod: {
      card: {
        number: '4111111111111111',
        expMonth: '12',
        expYear: '2023',
        cvv: '123',
      },
    },
  };

  try {
    const response = await axios.post(
      'https://api.2checkout.com/rest/6.0/transactions',
      payload,
      {
        auth: {
          username: TCO_MERCHANT_CODE,
          password: TCO_SECRET_KEY,
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Payment failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio'); // If using Twilio for sending SMS OTP
const nodemailer = require('nodemailer'); // If using nodemailer for sending email OTP
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Replace these with your Twilio credentials
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

// Replace these with your SMTP server details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

// In-memory storage for OTPs (Replace with database storage in production)
const otpStorage = {};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// API endpoint for generating and sending OTP via SMS
app.post('/api/generate-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();

  // Save OTP in storage with expiration time (e.g., 5 minutes)
  otpStorage[phoneNumber] = {
    otp,
    expiresAt: moment().add(5, 'minutes')
  };

  try {
    // Send OTP via SMS using Twilio
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: '+1234567890', // Your Twilio phone number
      to: phoneNumber
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// API endpoint for verifying OTP
app.post('/api/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Check if OTP exists in storage and is not expired
  if (otpStorage[phoneNumber] && moment().isBefore(otpStorage[phoneNumber].expiresAt)) {
    // Verify OTP
    if (otpStorage[phoneNumber].otp === otp) {
      // Clear OTP from storage
      delete otpStorage[phoneNumber];
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } else {
    res.status(400).json({ message: 'OTP expired or does not exist' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

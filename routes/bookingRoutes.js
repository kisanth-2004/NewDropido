const express = require('express');
const router = express.Router();
require('dotenv').config(); // .env மாறிகளை நேரடியாக லோட் செய்ய
const twilio = require('twilio');
const Booking = require('../models/Booking');

// Values உள்ளனவா என Console-ல் பார்க்க (பாதுகாப்பிற்காக முதல் 4 எழுத்துக்கள் மட்டும் print ஆகும்)
console.log('Twilio Config Check:', {
  sidPresent: !!process.env.TWILIO_SID,
  from: process.env.TWILIO_WHATSAPP_FROM,
  to: process.env.ADMIN_WHATSAPP_TO
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

router.post('/book', async (req, res) => {
  try {
    const { tripType, name, phone, pickup, drop, date, time, selectedCar } = req.body;

    if (!name || !phone || !pickup || !drop || !selectedCar) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided.'
      });
    }

    // 1. Save Booking
    const newBooking = new Booking({
      bookingCode: 'DRP-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90),
      tripType,
      name,
      phone,
      pickup,
      drop,
      date,
      time,
      selectedCar
    });

    const savedBooking = await newBooking.save();

    // 2. Format WhatsApp Message
    const tripTypeFormatted = tripType === 'oneway' ? 'One Way' : 'Round Trip';
    const messageBody = 
`🚖 *NEW TAXI BOOKING ALERT* 🚖
----------------------------------
*Booking ID:* ${savedBooking.bookingCode}
*Trip Type:* ${tripTypeFormatted}
*Customer Name:* ${name}
*Phone Number:* ${phone}
*Pickup:* ${pickup}
*Drop:* ${drop}
*Vehicle Selected:* ${selectedCar.toUpperCase()}
*Travel Date:* ${date || 'Not specified'}
*Pickup Time:* ${time || 'Not specified'}
----------------------------------
_Please contact the customer immediately to confirm._`;

    // 3. Send WhatsApp Notification via Twilio
    try {
      const response = await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: process.env.ADMIN_WHATSAPP_TO,
        body: messageBody
      });
      console.log('✅ WhatsApp Message Sent! SID:', response.sid);
    } catch (twilioError) {
      // பிழை என்னவென்று துல்லியமாகப் பார்க்க முழு விபரம்:
      console.error('❌ Twilio WhatsApp Error Details:', {
        status: twilioError.status,
        code: twilioError.code,
        message: twilioError.message
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Booking request placed successfully!',
      booking: savedBooking
    });

  } catch (error) {
    console.error('Server error on booking creation:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing booking.'
    });
  }
});

module.exports = router;
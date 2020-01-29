import express from 'express';
import mongoose from 'mongoose';

import { interpreterAccountSchema, bookingSchema } from '../schemas';

const router = express.Router();

const InterpreterUsers = mongoose.model('interpreter_users', interpreterAccountSchema);
const Bookings = mongoose.model('bookings', bookingSchema);

router.post('/request-booking', async (req, res) => {
  try {
    const booking = await Bookings.create(req.body);
    res.status(200).json(booking);
  } catch(err) {
    res.status(409).json({ error: `Error trying to save your booking - ${err}` });
  }
});

router.get('/availability', async (req, res) => {
  const { start_date, end_date, postcode } = req.headers;
  try {
    let bookedInterpreters = await Bookings.find({ start_date: { $gte: start_date}, end_date: { $lte: end_date } }).distinct('interpreter_id');
    let availableInterpreters = await InterpreterUsers.find({ _id: { $nin: bookedInterpreters } });

    res.send(availableInterpreters);
  } catch(err) {
    res.status(409).json({ error: `Error getting available interpreters - ${err}` });
  }
});

export default router;

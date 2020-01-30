import mongoose from 'mongoose';

export const bookingSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  total_price: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  company_id: {
    type: String,
    required: true
  },
  interpreter_full_name: {
    type: String,
    required: true
  },
  interpreter_id: {
    type: String,
    required: true
  },
});

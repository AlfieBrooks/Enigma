import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  company_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company_users'
  },
  postcode: {
    type: String,
    required: true
  },
  interpreter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'interpreter_users'
  },
});

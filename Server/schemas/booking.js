import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  companyName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  postcode: {
    type: String,
    required: true
  },
  requestId: String,
  interpreterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
});

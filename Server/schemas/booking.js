import mongoose from "mongoose";

export const bookingDetails = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  companyName: String,
  postcode: String,
  requestId: String,
  interpreterId: String,
});

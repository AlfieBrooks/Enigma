import mongoose from "mongoose";

export const accountDetails = mongoose.Schema({
  _id: String,
  password: String,
  firstName: String,
  lastName: String,
  confirmPassword: String,
  postcode: String,
  hourlyRate: String,
  maxDistance: Number,
  companyName: String,
  membershipId: Number,
  membershipExpiry: Date
});

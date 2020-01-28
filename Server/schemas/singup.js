import mongoose from "mongoose";

//TODO Change from cammel case
export const companyAccountSchema = new mongoose.Schema({
  account_type: {
    type: String,
    default: 'Company',
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookings'
  }],
});

export const interpreterAccountSchema = new mongoose.Schema({
  account_type: {
    type: String,
    default: 'Interpreter',
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  maxDistance: {
    type: Number,
    required: true
  },
  membershipId: {
    type: Number,
    required: true
  },
  membershipExpiry:  {
    type: Number,
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookings'
  }],
});

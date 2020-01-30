import mongoose from 'mongoose';

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
    required: true,
    select: false
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
    required: true,
    select: false
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  hourly_rate: {
    type: Number,
    required: true
  },
  max_distance: {
    type: Number,
    required: true
  },
  membership_id: {
    type: Number,
    required: true
  },
  membership_expiry:  {
    type: String,
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookings'
  }],
});

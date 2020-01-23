import mongoose from 'mongoose';

export const accountDetails = mongoose.Schema({
    _id: String,
    password: String,
    membership: Number,
    membershipExpiry: Number,
    admin: Boolean,
    authToken: String,
    //Maybe this should move
    availability: Date,
    dayRate: Number,
    location: String,
    radius: Number,
})
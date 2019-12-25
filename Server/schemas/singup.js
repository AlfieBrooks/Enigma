import mongoose from 'mongoose';

export const accountDetails = mongoose.Schema({
    _id: String,
    password: String,
    membership: Number,
    membershipExpiry: Number,
    admin: Boolean,
    //Maybe this should move
    availability: Date,
    dayRate: Number,
    Location: String,
    Radius: Number,
})
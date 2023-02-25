const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userEmail: {
        type: String

    },
    tourName: {
        type: String,

    },
    fullName: {
        type: String,
        required: true,
    },
    guestSize: {
        type: Number,

    },
    phone: {
        type: Number,

    },
    bookAt: {
        type: Date,

    },

}, { timestamps: true });

const Bookings = new mongoose.model("Booking", bookingSchema);

module.exports = Bookings;
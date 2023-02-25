const Booking = require("../models/Booking.js");

exports.createBooking = async(req, res) => {

    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save();


        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedBooking,
        })
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to create. Try again" });
    }
};

//get All booking
exports.getAllBooking = async(req, res) => {
    const id = req.params.id
    try {
        const getallBooking = await Booking.findById({ id });

        res.status(200).json(getallBooking)
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to get data. Try again" });

    }
};
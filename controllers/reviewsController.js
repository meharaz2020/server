const Reviews = require("../models/Review.js");
const Tour = require("../models/Tour.js");


exports.createReviews = async(req, res, next) => {
    const tourId = req.params.tourId
    const newReview = new Reviews({...req.body })
    try {
        const savedReviews = await newReview.save();

        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReviews._id }
        })
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedReviews,
        })
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to create. Try again" });
    }
};
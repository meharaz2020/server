const express = require("express");
const router = new express.Router();


const reviewscontrollers = require("../controllers/reviewsController");
const { verifyUser } = require("../utils/verifyToken");

router.post("/:tourId", verifyUser, reviewscontrollers.createReviews);

module.exports = router;
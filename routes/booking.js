const express = require("express");
const router = new express.Router();


const bookingcontrollers = require("../controllers/bookingController");
const { verifyUser } = require("../utils/verifyToken");

router.post("/", verifyUser, bookingcontrollers.createBooking);
router.get("/:id", verifyUser, bookingcontrollers.getAllBooking);

module.exports = router;
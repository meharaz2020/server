const express = require("express");
const router = new express.Router();


const authcontrollers = require("../controllers/authController");

router.post("/register", authcontrollers.register);
router.post("/login", authcontrollers.login);

module.exports = router;
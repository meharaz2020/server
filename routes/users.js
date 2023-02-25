const express = require("express");
const router = new express.Router();


const usercontrollers = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

router.post("/", verifyUser, usercontrollers.createUser);
router.put("/:id", verifyUser, usercontrollers.updateUser);
router.delete("/:id", verifyUser, usercontrollers.deleteUser);
router.get("/", verifyAdmin, usercontrollers.getAllUser);
router.get("/:id", verifyUser, usercontrollers.getsingleUser);
router.get("/search/getTourBySearch", usercontrollers.getUserBySearch);

router.get("/search/getAllTourCount", usercontrollers.getAllUserCount);

module.exports = router;
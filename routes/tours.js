const express = require("express");
const router = new express.Router();


const controllers = require("../controllers/tourController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

router.post("/", controllers.createTour);
router.put("/:id", verifyAdmin, controllers.updateTour);
router.delete("/:id", verifyAdmin, controllers.deleteTour);
router.get("/", controllers.getAllTour);
router.get("/:id", controllers.getsingleTour);
router.get("/search/getTourBySearch", controllers.getTourBySearch);
router.get("/search/getAllfeatured", controllers.getAllfeatured);
router.get("/search/getAllTourCount", controllers.getAllTourCount);

module.exports = router;
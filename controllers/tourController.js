 const Tour = require("../models/Tour.js");


 exports.createTour = async(req, res, next) => {
     const newTour = new Tour(req.body);
     try {
         const savedTour = await newTour.save();

         res.status(200).json({
             success: true,
             message: "Successfully created",
             data: savedTour,
         })
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to create. Try again" });
     }
 };

 //get single tours
 exports.getsingleTour = async(req, res) => {
     const { id } = req.params;
     try {
         const getSingleTour = await Tour.findOne({ _id: id }).populate('reviews');

         res.status(200).json(getSingleTour)
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to get data. Try again" });

     }
 };
 //get All tours
 exports.getAllTour = async(req, res) => {
     const page = parseInt(req.query.page);
     try {
         const getallTour = await Tour.find({}).populate('reviews').skip(page * 8).limit(8);

         res.status(200).json(getallTour)
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to get data. Try again" });

     }
 };
 //update tours
 exports.updateTour = async(req, res) => {
     const id = req.params.id
     try {
         const updatedTour = await Tour.findByIdAndUpdate(id, {
             $set: req.body
         }, { new: true })
         res.status(200).json({
             success: true,
             message: "Successfully update",
             data: updatedTour,
         })
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to update. Try again" });

     }
 };
 //delete tours
 exports.deleteTour = async(req, res) => {
     const id = req.params.id
     try {
         await Tour.findByIdAndDelete(id);

         res.status(200).json({
             success: true,
             message: "Successfully delete"

         })
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to delete. Try again" });

     }
 };
 //search tour
 exports.getTourBySearch = async(req, res) => {
     const city = new RegExp(req.query.city, 'i')
     const distance = parseInt(req.query.distance)
     const maxGroupSize = parseInt(req.query.maxGroupSize)

     try {
         const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews')

         res.status(200).json({
             success: true,
             message: "Data Found",
             data: tours,

         })
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to search. Try again" });

     }
 }

 //get All featured
 exports.getAllfeatured = async(req, res) => {
     try {
         const getallFeatured = await Tour.find({ featured: true }).populate('reviews').limit(8);

         res.status(200).json(getallFeatured)
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to get data. Try again" });

     }
 };
 //get All tour count
 exports.getAllTourCount = async(req, res) => {
     try {
         const getallcount = await Tour.estimatedDocumentCount();

         res.status(200).json(getallcount)
     } catch (err) {
         res.status(404).json({ success: false, message: "Failed to get data. Try again" });

     }
 };
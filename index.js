 const mongoose = require("mongoose");

 const cookieParser = require("cookie-parser");
 // const { MongoClient, ServerApiVersion } = require('mongodb');
 require("dotenv").config();
 const express = require("express");
 const app = express();

 const cors = require("cors");
 const corsOption = {
     origin: true,
     credentials: true
 }


 const tourRoute = require("./routes/tours.js");
 const userRoute = require("./routes/users.js");
 const authRoute = require("./routes/auth.js");
 const reviewsRoute = require("./routes/reviews.js");
 const bookingRoute = require("./routes/booking.js");

 const port = process.env.PORT || 8000

 // app.get("/", (req, res) => {
 //     res.send("api is working");
 // });


 //database connection
 mongoose.set("strictQuery", false);
 const connect = async() => {
     try {
         await mongoose.connect(process.env.MONGO_URL, {
             useNewUrlParser: true,
             useUnifiedTopology: true
         })
         console.log('MongoDB database connected');
     } catch (err) {
         console.log("db connect fail");
     }
 }











 app.use(express.json());
 app.use(cors(corsOption));
 app.use(cookieParser());
 app.use("/api/v1/tours", tourRoute);
 //  app.use("/api/v1/users", userRoute);
 app.use("/api/v1/auth", authRoute);
 app.use("/api/v1/review", reviewsRoute);
 app.use("/api/v1/booking", bookingRoute);








 app.listen(port, () => {
     connect();
     console.log(`server start ${port}`);
 })
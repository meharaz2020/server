const User = require("../models/User");

//create a user
exports.createUser = async(req, res, next) => {
    const newUser = new Tour(req.body);
    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedUser,
        })
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to create. Try again" });
    }
};

//get single user
exports.getsingleUser = async(req, res) => {
    const { id } = req.params;
    try {
        const getSingleUser = await User.findOne({ _id: id });

        res.status(200).json(getSingleUser)
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to get data. Try again" });

    }
};
//get All tUser
exports.getAllUser = async(req, res) => {
    const page = parseInt(req.query.page);
    try {
        const getallUser = await User.find({}).skip(page * 8).limit(8);

        res.status(200).json(getallUser)
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to get data. Try again" });

    }
};
//update User
exports.updateUser = async(req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Successfully update",
            data: updatedUser,
        })
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to update. Try again" });

    }
};
//deleUser
exports.deleteUser = async(req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully delete"

        })
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to delete. Try again" });

    }
};

//search user
exports.getUserBySearch = async(req, res) => {
    const name = new RegExp(req.query.name, 'i')


    try {
        const Users = await User.find({ name })

        res.status(200).json({
            success: true,
            message: "Data Found",
            data: Users,

        })
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to search. Try again" });

    }
}


//get All user count
exports.getAllUserCount = async(req, res) => {
    try {
        const getallcount = await User.estimatedDocumentCount();

        res.status(200).json(getallcount)
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed to get data. Try again" });

    }
};
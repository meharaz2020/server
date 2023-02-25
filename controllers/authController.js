const User = require("../models/User.js");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register = async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo
    })
    try {
        const savedregister = await newUser.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedregister,
        })
    } catch (err) {
        res.status(404).json({ success: true, message: 'Failed to create. Try again' })

    }

}
exports.login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res
                .status(401)
                .json({ success: false, message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY, { expiresIn: '15d' }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // set the expiration date to 15 days
        });

        const { password: _, ...userData } = user._doc; // remove the password from the user data

        res.status(200).json({
            success: true,
            token,
            data: userData,
            role: user.role,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to login. Try again later.',
        });
    }
};
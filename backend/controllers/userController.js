import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// user login route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false, message: "User doesn't Exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        } else {
            return res.json({
                success: false, message: "Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false, message: error.message
        })

    }
}




// route for user Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false, message: 'User Already Exists'
            })
        }

        //  validating email format and strong pass
        if (!validator.isEmail(email)) {
            return res.json({
                success: false, message: 'Please enter a valid email'
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false, message: 'Please enter a strong password'
            })
        }

        // Hashing user Pass
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPass
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });


    } catch (error) {
        const { email } = req.body;
        console.log(error);
        const result = await userModel.deleteOne({ email: email });
        if (result.deletedCount > 0) {
            console.log(`User with email ${email} deleted successfully.`);
        } else {
            console.log(`No user found with email ${email}.`);
        }
        res.status(500).json({ success: false, message: error.message })
    }
}

// admin login

const adminLogin = async (req, res) => {

}

export { loginUser, registerUser, adminLogin };
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const genrateTokenAndSetCookie = require("../utils/generateToken");

const login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const findUser = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password,findUser?.password || "");
        if(!findUser || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        genrateTokenAndSetCookie(findUser._id,res);

        res.status(201).json({
            _id:findUser._id,
            fullname:findUser.fullname,
            email:findUser.email,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const signup = async (req, res) => {
    try {
        // await User.collection.drop();
        // console.log("Collection dropped successfully");

        const { name, surname, password, confirmPassword, email } = req.body;

        // Log input data for debugging (you might want to remove this in production)
        console.log(name, surname, password, confirmPassword, email);

        // Validate input data
        if (!name || !surname || !password || !confirmPassword || !email) {
            return res.status(400).json({ error: "All details are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if email is already registered
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullname: `${name} ${surname}`,
            password: hashedPassword,
            role: "Student",
            email
        });

        // Save new user to the database
        await newUser.save();

        // Generate token and set cookie (ensure this function is defined)
        genrateTokenAndSetCookie(newUser._id, res);

        // Respond with user details
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email
        });

    } catch (error) {
        // Log the error for debugging
        console.error("Error in signup controller:", error.message);

        // Respond with generic error message
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const logout = async(req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = {
    login,
    signup,
    logout,
}
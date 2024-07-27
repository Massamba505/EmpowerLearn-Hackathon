const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const genrateTokenAndSetCookie = require("../utils/generateToken");

const login = async(req,res) =>{
    try {
        const {username,password} = req.body;
        const findUser = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password,findUser?.password || "");
        if(!findUser || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        genrateTokenAndSetCookie(findUser._id,res);

        res.status(201).json({
            _id:findUser._id,
            fullname:findUser.fullname,
            username:findUser.username,
            profilePic:findUser.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const signup = async (req,res) =>{
    try {
        const {fullname,username,password,confirmPassword} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"password's do not match"});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"username already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newgender = gender == "male"? "boy":"girl";
        const profilePic = `https://avatar.iran.liara.run/public/${newgender}?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic
        });

        if(newUser){
            // Generate JWT token here
            genrateTokenAndSetCookie(newUser._id,res);

            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                profilePic:newUser.profilePic
            });
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

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
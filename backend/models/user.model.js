const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true
    },
    password: { 
        type: String
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    role: { 
        type: String, 
        enum: ['Student', 'Tutor', 'Admin'], 
        required: true
    },
    googleId: { 
        type: String, unique: true, sparse: true
    }, // Google ID for OAuth
    googleAccessToken: { 
        type: String
    }, // Optional, can store access token if needed
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { 
        type: String, 
        unique: true,
        required:true
    },
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
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);

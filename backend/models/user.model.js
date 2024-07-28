const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { 
        type: String,
        required: true
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
        default: "Student"
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

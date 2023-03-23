const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,

    }, 

    userId: {
        type: String,
        required: true, 
        unique: true,
    }, 

    password: {
        type: String, 
        required: true,

    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10, 
        unique: true
    },

    createadAt: {
        type: Date,
        immutalble: true, 
        default: () => {
            return Date.now();
        }
    },

    updatedAt: { 
        type: Date,
        immutalble: true, 
        default: () => {
            return Date.now()
        }
    }, 
    
    userType: {

        type: String, 
        required: true,
        default: approved,


    }

})

module.exports = mongoose.model("User", userSchema);
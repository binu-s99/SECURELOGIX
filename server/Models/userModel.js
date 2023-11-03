const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required !']
    },

    lastName: {
        type: String,
        required: [false]
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    role: {
        type: String,
        required: [true, 'Role is required']
    },


})

const User = mongoose.model("User", userSchema);

module.exports = User;


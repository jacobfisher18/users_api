const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create user Schema and model
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    age: {
        type: Number
    },
    premium: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
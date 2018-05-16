const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let StudentSchema = Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessLvl: {
        type: Number,
        default: 2
    }
});

module.exports = () => {
    return mongoose.model('Student', StudentSchema);
};
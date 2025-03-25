const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roommateSchema = new Schema({
    title: {type: String, required: true},
    poster: {type: String, required: true},
    details: {type: String, minLength: [10, 'details should have at least 10 characters'], required: true},
    gender: {type: String, required: true},
    style: {type: String, required: true}
},
    {timestamps: true}
);

module.exports = mongoose.model('Roommate', roommateSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roommateSchema = new Schema({
    title: {type: String, required: true},
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    details: {type: String, minLength: [10, 'details should have at least 10 characters'], required: true},
    gender: {type: String, required: true},
    comments: [{ author: String, text: String }],
    style: {type: String, required: true}
},
    {timestamps: true},
    {strictPopulate: false}
);


module.exports = mongoose.model('Roommate', roommateSchema);
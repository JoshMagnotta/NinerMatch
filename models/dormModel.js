const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dormSchema = new Schema(
  {
    name: { type: String, required: true },
    poster: { type: Schema.Types.ObjectId, ref: 'User' },
    user_comment: { type: String, required: true },
    star_rating: { type: Number, required: true },
    parking_access: { type: String, required: true },
    average_rent: { type: Number, required: true },
    on_campus: { type: Boolean, required: true },
  },
);

module.exports = mongoose.model('Dorm', dormSchema);




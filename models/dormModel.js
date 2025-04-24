const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dormSchema = new Schema({
  name: { type: String, required: true },
  poster: { type: Schema.Types.ObjectId, ref: 'User' },
  star_rating: { type: Number, required: true },
  parking_access: { type: String, required: true },
  average_rent: { type: Number, required: true },
  on_campus: { type: Boolean, required: true },
  reviews: [
    {
      author: String,
      text: String,
      star_rating: Number,
      rent_paid: Number,
      created_at: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Dorm', dormSchema);
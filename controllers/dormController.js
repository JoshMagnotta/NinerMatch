const Dorm = require('../models/dormModel');

exports.index = async (req, res) => {
  try {
    const dorms = await Dorm.find(); // fetches all fields
    res.render('dorms/index', { dorms });
  } catch (err) {
    console.error("Error loading dorms:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getDorm = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);
    if (!dorm) return res.status(404).render('404');

    // Calculate average rating from reviews
    let avgRating = 0;
    if (dorm.reviews && dorm.reviews.length > 0) {
      const sum = dorm.reviews.reduce((acc, r) => acc + r.star_rating, 0);
      avgRating = (sum / dorm.reviews.length).toFixed(1);
    }

    res.render('dorms/reviews', { dorm, avgRating });
  } catch (err) {
    console.error("Error loading dorm:", err);
    res.status(500).send("Server Error");
  }
};

exports.addReview = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);
    console.log("📌 Fetched dorm:", dorm);

    if (!dorm) return res.status(404).send("Dorm not found");

    if (!dorm.reviews || !Array.isArray(dorm.reviews)) {
      console.log("🛠 Forcing reviews into a clean array");
      dorm.reviews = [];
    }

    const author = req.session?.user
      ? `${req.session.user.firstName} ${req.session.user.lastName}`
      : 'Anonymous';

    const reviewData = {
      author,
      text: req.body.text,
      star_rating: parseFloat(req.body.star_rating),
      rent_paid: parseFloat(req.body.rent_paid),
      created_at: new Date()
    };

    console.log("📝 Review to push:", reviewData);
    console.log("✅ reviews before push:", dorm.reviews);

    dorm.reviews.push(reviewData);

    // 🔧 Force Mongoose to track the array mutation
    dorm.markModified('reviews');
    if (dorm.reviews.length > 0) {
      const totalRating = dorm.reviews.reduce((sum, r) => sum + r.star_rating, 0);
      const totalRent = dorm.reviews.reduce((sum, r) => sum + r.rent_paid, 0);
      dorm.star_rating = (totalRating / dorm.reviews.length).toFixed(1);
      dorm.average_rent = Math.round(totalRent / dorm.reviews.length);
    }
    console.log("⭐ Calculated average rent:", dorm.average_rent);
    const saved = await dorm.save();
    console.log("✅ Saved dorm:", saved);    
    res.status(200).json({ message: 'Review added' });

  } catch (err) {
    console.error("❌ Error adding review:", err);
    res.status(500).json({ error: 'Error adding review' });
  }
};
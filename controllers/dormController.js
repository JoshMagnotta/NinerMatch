const Dorm = require('../models/dormModel');

exports.index = async (req, res) => {
  try {
    const dorms = await Dorm.find({}, 'name'); // fetch only names
    res.render('dorms/index', { dorms });
  } catch (err) {
    console.error("Error loading dorms:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getDorm = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);
    if (!dorm) {
      return res.status(404).render('404');
    }
    res.render('dorms/reviews', { dorm });
  } catch (err) {
    console.error("Error loading dorm:", err);
    res.status(500).send("Server Error");
  }
};

exports.addReview = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);
    if (!dorm) {
      return res.status(404).send("Dorm not found");
    }

    const author = req.session.user
      ? req.session.user.firstName + ' ' + req.session.user.lastName
      : 'Anonymous';

    dorm.reviews.push({
      author,
      text: req.body.text,
      star_rating: req.body.star_rating
    });

    await dorm.save();
    res.status(200).json({ message: 'Review added' });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: 'Error adding review' });
  }
};

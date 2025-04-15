const Dorm = require('../models/dormModel'); 

exports.index = async (req, res, next) => {
  try {
    const dorms = await Dorm.find(); // Fetch all dorms from the database
    res.render('dorms/index', { dorms }); // Pass the dorms data to the EJS template
  } catch (error) {
    console.error('Error fetching dorms:', error);
    res.status(500).send('Internal Server Error');
  }
};
const Roommate = require("../models/roommateModel");
const User = require('../models/userModel')

exports.index = async (req, res, next) => {
    try {
        let roommate = await Roommate.find().populate('poster', 'firstName lastName')
        res.render("roommate/index", { roommate });
    } catch (error) {
        console.error("Error fetching roommates:", error);
        res.status(500).send("Internal Server Error");
    }
};

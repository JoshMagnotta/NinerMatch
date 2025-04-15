const Roommate = require("../models/roommateModel");
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.index = async (req, res, next) => {
    try {
        let roommate = await Roommate.find().populate('poster', 'firstName lastName');
        res.render("roommate/index", { roommate });
    } catch (error) {
        console.error("Error fetching roommates:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.create = async (req, res) => {
    try {
         let post = new Roommate(req.body);
         post.poster = new mongoose.Types.ObjectId(req.session.user.id);
 
         await post.save();
 
         res.redirect('/roommates');
    } catch (error) {
        console.error("Error creating roommate post:", error);
        res.status(500).send("Error creating post");
    }
};

exports.getPost = async (req, res) => {
    try {
        const roommate = await Roommate.findById(req.params.id).populate('poster', 'firstName lastName');
        if (!roommate) {
            return res.status(404).render('404');
        }
        res.render('roommate/post', { roommate });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.comment = async (req, res) => {
    try {
        const { text } = req.body;

        const author = req.session.user
            ? req.session.user.firstName + ' ' + req.session.user.lastName
            : 'Anonymous';

        const roommate = await Roommate.findById(req.params.id);

        if (!roommate) {
            return res.status(404).send('Roommate post not found');
        }

        roommate.comments.push({ author, text });

        await roommate.save();

        res.status(200).json({ message: 'Comment added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding comment' });
    }
};

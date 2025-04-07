const express = require('express');
const controller = require('../controllers/roommateController');
const Roommate = require('../models/roommateModel'); 



const router = express.Router();
    
router.get('/', controller.index)

router.get('/:id', async (req, res) => {
    try {
        const roommate = await Roommate.findById(req.params.id).populate('poster');
        if (!roommate) {
            return res.status(404).render('404');
        }
        res.render('roommate/post', { roommate });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        const { text } = req.body;

        const author = req.session.user ? req.session.user.firstName + ' ' + req.session.user.lastName : 'Anonymous';

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
});

module.exports = router;
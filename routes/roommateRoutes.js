const express = require('express');
const controller = require('../controllers/roommateController');
const roommates = require("../mock-api/roommates"); 

const router = express.Router();

router.get("/", (req, res) => {
    res.render("roommate/index", { roommates: roommates }); 
});


module.exports = router;
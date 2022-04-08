const Details = require("../models/Details");

module.exports = (req, res) => {
    res.render('home',{ userID: req.session.userId });
} ;
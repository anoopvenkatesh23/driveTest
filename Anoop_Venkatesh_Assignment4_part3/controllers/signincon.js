const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");


module.exports = (req, res) => {
    res.render('signup',{
        // errors:req.session.validationErrors
        errors:req.flash('validationErrors')
    });
} ;
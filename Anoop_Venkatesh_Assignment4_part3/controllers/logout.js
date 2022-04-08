const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");


module.exports = (req, res) => {
    delete req.session.userId 
    res.redirect('/');
} ;

//we delete the user session ones the user clicks on login
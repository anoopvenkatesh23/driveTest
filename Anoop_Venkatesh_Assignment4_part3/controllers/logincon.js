const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");

module.exports = (req, res) => {
  res.render("login", {
    errors: req.flash("validationErrors"),
  });
};


//using flash, we will display the errors
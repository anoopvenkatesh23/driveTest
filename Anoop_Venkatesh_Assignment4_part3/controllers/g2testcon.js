const Details = require("../models/Details");
const Appointments = require('../models/Appointment')

module.exports = async (req, res) => {
  if (req.session.userId) {
    let g2Details = await Details.findOne({
      Useridentification: req.session.userId,
    });
    if (g2Details && !req.query.error) {
      return res.status(200).render("g2test", { g2Details });
    } else {
      const displayerror = req.query.error;
      return res.render("g2test", { displayerror, error: false });
    }
  }
  res.redirect("/");
};

//we are finiding the session id from the db and displaying the details if that user had already entered the details.
//we will ask the user to enter the details again if the session was not found.

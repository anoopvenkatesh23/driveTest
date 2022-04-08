const Appointments = require("../models/Appointment");

module.exports = async (req, res) => {
  if (req.session.userId) {
    return res.render("appointment");
  }
  res.redirect("/");
};

const Appointments = require("../models/Appointment");


const path = require("path");

module.exports = async (req, res) => {
  const slots = await Appointments.find({ date : req.params.date })
  return res.render("appointment");

};


//we will store the user details into the db only if the user has been logged in

const Details = require("../models/Details");
const Appointments = require("../models/Appointment");

const path = require("path");

module.exports = async (req, res) => {
  const slots = await Appointments.find({ date: req.params.date });

  console.log(slots,'slots')

  let times = [];

  if (slots[0]) {
    times = slots[0].time;
  }
  return res.json({ slotTimes: times });
  
};

//we will store the user details into the db only if the user has been logged in

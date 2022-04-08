const mongoose = require("mongoose");
const Userdetails = require("../models/Userdetails");
const Appointments = require("../models/Appointment");

const path = require("path");

module.exports = async (req, res) => {
  const slots = await Appointments.find({ date: req.body.date });

  let availableSlots = [...slots];

  await availableSlots[0].time.forEach((element) => {
    if (element.time === req.body.time) {
      element.isTimeSlotAvailable = false;
    }
  });

  console.log(req.session.userId, "req.session.UserId");

  const appointment = {
    AppointmentId: mongoose.Types.ObjectId(),
    time: req.body.time,
  };

  await Userdetails.updateOne(
    { _id: req.session.userId },
    { Appointment: appointment }
  );

  await Appointments.updateOne(
    { date: availableSlots[0].date },
    availableSlots[0]
  );

  res.redirect("/g2test");
};

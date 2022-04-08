const Appointments = require("../models/Appointment");

const path = require("path");

module.exports = async (req, res) => {
  let appointmentsBooked = {
    date: req.body.date,
    time: [],
  };

  let timee = Array.isArray(req.body.time) ? [...req.body.time] : req.body.time;
  console.log(timee, "time");
  const appointments = await Appointments.findOne({ date: req.body.date });

  if (appointments) {
    appointments.time.forEach((time) => {
      if (timee.includes(time.time)) {
        timee = timee.filter((el) => el !== time.time);
      }
    });
    if (Array.isArray(timee)) {
      await timee.forEach((time) => {
        appointmentsBooked.time.push({
          time: time,
          isTimeSlotAvailable: true,
          isTimeSlotAdded: true,
        });
      });
    } else {
      appointmentsBooked.time.push({
        time: timee,
        isTimeSlotAvailable: true,
        isTimeSlotAdded: true,
      });
    }
    if (timee.length < 1) {
      return res.redirect("/appointment");
    }
    console.log(
      [...appointments.time, ...appointmentsBooked.time],
      "appointmentsBooked"
    );
    await Appointments.updateOne({date: req.body.date},{ time: [...appointments.time ,...appointmentsBooked.time]  })
    return res.redirect("/appointment");
  } else {
    await req.body.time.forEach((time) => {
      appointmentsBooked.time.push({
        time: time,
        isTimeSlotAvailable: true,
        isTimeSlotAdded: true,
      });
    });
    Appointments.create(appointmentsBooked, (error, detail) => {
      res.redirect("/appointment");
    });
  }
};

//we will store the user details into the db only if the user has been logged in

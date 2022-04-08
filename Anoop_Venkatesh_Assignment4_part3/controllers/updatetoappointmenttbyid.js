const Appointments = require("../models/Appointment");


module.exports = async (req, res) => {
  const apptDetails = {
    Useridentification: req.session.userId,
    date: req.body.date,
    time: req.body.time,
  };
  
  await Appointments.updateOne(
    { Useridentification: req.session.userId },
    apptDetails
  );
  return res.redirect("/appointment");
};


//we will update the details in the g2page only if the user has been logged in. 
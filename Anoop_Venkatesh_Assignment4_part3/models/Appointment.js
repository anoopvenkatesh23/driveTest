const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema([
  {
    date: String,
    time: Array,
  },
]);

const Appointments = mongoose.model("Appointments", AppointmentsSchema);

module.exports = Appointments;

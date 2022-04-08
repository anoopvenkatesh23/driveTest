// Student Name: ANOOP VENKATESH
// Student No: 8750864

const mongoose = require("mongoose");
const ObjectId = require("mongoose");

const Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

// npm i --save bcrypt
//import the bcrypt package
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  Username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, "Please provide password"],
  },
  Appointment: {
    AppointmentId: { type : String  , default:"" },
    time: { type : String  , default:"" },
  },

  Usertype: String,
});

UserSchema.pre("save", function (next) {
  const user = this; //get the object that we are going to save it
  bcrypt.hash(user.Password, 10, (error, hash) => {
    user.Password = hash;
    next();
  });
});

UserSchema.plugin(uniqueValidator);

const Userdetails = mongoose.model("Userdetails", UserSchema);

module.exports = Userdetails;

// mongoose.Types.ObjectId()

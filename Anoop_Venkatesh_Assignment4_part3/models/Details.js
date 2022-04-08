// Student Name: ANOOP VENKATESH
// Student No: 8750864

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  HouseNumber: String,
  Street: String,
  Country: String,
  State: String,
  Postalcode: String,
});

const CarDetailsSchema = new Schema({
  Carmake: String,
  Caryear: Number,
  Carmodel: String,
  Platenumber: String,
});

const DetailsSchema = new Schema({
  Useridentification: String,
  FName: String,
  LName: String,
  UID: { type: String, unique: true },
  DOB: Date,
  Address: AddressSchema,
  Cardetails: CarDetailsSchema,
  LicenseNumber: { type: String, unique: true },
  image: Array,
});

// npm i --save bcrypt
//import the bcrypt package
const bcrypt = require("bcrypt");

DetailsSchema.pre("save", function (next) {
  const detail = this; //get the object that we are going to save it

  bcrypt.hash(detail.LicenseNumber, 10, (error, hash) => {
    detail.LicenseNumber = hash;
    next();
  });

  bcrypt.hash(detail.UID, 5, (error, UIDhashed) => {
    detail.UID = UIDhashed;
  });
  

});

const Details = mongoose.model("Details", DetailsSchema);

module.exports = Details;

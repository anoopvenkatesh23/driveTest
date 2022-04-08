const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");

const path = require("path");

module.exports = async (req, res) => {
  let image = req.files.image;
  console.log(image);
  let imageList = [];

  if (Array.isArray(image)) {
    image.forEach((element) => {
      imageList.push("/img/" + element.name);
      element.mv(
        path.resolve(__dirname, "../public/img", element.name),
        async (error) => {
          console.log(error);
        }
      );
    });
  } else {
    imageList.push("/img/" + image.name);
    image.mv(
      path.resolve(__dirname, "../public/img", image.name),
      async (error) => {
        console.log(error);
      }
    );
  }

  const g2details = {
    Useridentification: req.session.userId,
    FName: req.body.FName,
    LName: req.body.LName,
    UID: req.body.UID,
    DOB: req.body.DOB,
    Address: {
      HouseNumber: req.body.HouseNumber,
      Street: req.body.Street,
      Country: req.body.Country,
      State: req.body.State,
      Postalcode: req.body.Postalcode,
    },
    Cardetails: {
      Carmake: req.body.Carmake,
      Caryear: req.body.Caryear,
      Carmodel: req.body.Carmodel,
      Platenumber: req.body.Platenumber,
    },
    LicenseNumber: req.body.LicenseNumber,
    image: imageList,
  };

  Details.create(g2details, (error, detail) => {
    console.log("Error : ", error);
    console.log("Details: ", detail);
    res.redirect("/g2test");
  });
};


//we will store the user details into the db only if the user has been logged in
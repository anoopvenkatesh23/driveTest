const Details = require("../models/Details");

const path = require("path");

module.exports = async (req, res) => {
  let g2UserDetails = await Details.findOne({
    Useridentification: req.session.userId,
  });
  const isImageExist = !!(req.files && req.files.image);

  let imageList = [];
  let image = isImageExist ? req.files.image : g2UserDetails.image;

  if (isImageExist) {
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
    image: isImageExist ? imageList : g2UserDetails.imageList,
  };
  await Details.updateOne(
    { Useridentification: req.session.userId },
    g2details
  );
  return res.redirect("/g2test");
};


//we will update the details in the g2page only if the user has been logged in. 
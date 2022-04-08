const Details = require("../models/Details");


module.exports = async (req, res) => {
    Details.findByIdAndUpdate(req.params.id,{
        Address:{
          HouseNumber: req.body.HouseNumber,
          Street: req.body.Street,
          Country: req.body.Country,
          State: req.body.State,
          Postalcode: req.body.Postalcode,
        },
        Cardetails:{
          Carmake: req.body.Carmake,
          Caryear: req.body.Caryear,
          Carmodel: req.body.Carmodel,
          Platenumber: req.body.Platenumber,
        }
      }, (error)=>{
          console.log(error);
          console.log(req.body);
          res.redirect('/gtest');
     });
};

//user will be able to update the records after the information is displayed when user entered the UID
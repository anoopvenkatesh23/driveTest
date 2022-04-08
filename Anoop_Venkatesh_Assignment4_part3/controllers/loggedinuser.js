const bcrypt = require("bcrypt");

const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");

module.exports = (req, res) => {
  const { Username, Password } = req.body;

  if (req.body.Username === "" || req.body.Password === "") {
    req.flash("validationErrors", "Please enter your credentials");
    return res.redirect("/login");
  }
  Userdetails.findOne({ Username: Username }, (error, user) => {
    if (user) {
      console.log(user);
      bcrypt.compare(Password, user.Password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.userType;
          if (user.Usertype == "Driver") {
            res.redirect("/driver");
          } else if (user.Usertype == "Admin") {
            res.redirect("/admin");
          } else {
            res.redirect("/");
          }
        } else {
          res.redirect("/signup");
        }
      });
    } else {
      res.redirect("/signup");
    }
  });
};

//we first perform a simple validation to check if username and password are entered are not.
//we check the username and password entered was correct or incorrect and return to the corresponding pages. 

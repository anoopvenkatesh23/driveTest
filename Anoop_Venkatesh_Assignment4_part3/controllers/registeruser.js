const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");

module.exports = async (req, res) => {
  if (req.body.Password == req.body.ReenterPassword) {
    Userdetails.create(req.body, (error, userdetails) => {
      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );
        req.flash("validationErrors", validationErrors);
        // req.session.validationErrors = validationErrors
        return res.redirect("/signup");
      }
      console.log(error);
      res.redirect("/login");
    });
  } else {
    req.flash(
      "validationErrors",
      "Password and re-enter password are not matching"
    );
    return res.redirect("/signup");
  }
};


//we first check if the password and reenter passwords are correct and display a flash message if wrong.
//we will register the user only if both are correct and also display errors using flash if the fields are empty. 
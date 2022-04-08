
const Details = require("../models/Details");

module.exports = (req, res) => {
    console.log(req.session.userType)
  res.render("admin", { userID: req.session.userId , page: 'admin'});
};

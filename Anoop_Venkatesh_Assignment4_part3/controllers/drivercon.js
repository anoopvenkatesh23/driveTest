const Details = require("../models/Details");

module.exports = (req, res) => {
    console.log(req.session.userType)
  res.render("driver", { userID: req.session.userId , page: 'driver',userType:req.session.userType});
};

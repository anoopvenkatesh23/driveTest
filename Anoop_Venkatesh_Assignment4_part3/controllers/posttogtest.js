const Details = require("../models/Details");

module.exports = async (req, res) => {
    const userdetails = await Details.findOne({UID:req.body.UID ,Useridentification: req.session.userId });
    if (userdetails==null) {
      const errormessage = "No UID found, Please re-enter details"
      res.redirect("g2test?error=" + errormessage)
    } else{
      res.render('gtest', {
        userdata: userdetails 
      });
    }
} ;


//we will look for UID and session id, if they are not found, we will ask them to go enter in g2 page else we will
//show the details in gpage.

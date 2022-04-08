const Details = require("../models/Details");
const Userdetails = require("../models/Userdetails");

//middleware is used to check if the session exists or not
module.exports = (req,res, next)  => {
    Userdetails.findById(req.session.userId, (error,user) => {
        if(error || !user)
            return res.redirect('/')
        next()
    })
}
// Student Name: ANOOP VENKATESH
// Student No: 8750864

const express = require("express");

const path = require("path");

const app = new express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Details = require("./models/Details");
const Userdetails = require("./models/Userdetails");

//importing express session
const expressSession = require("express-session");

app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

//install express-fileupload
// import fileUpload module
const fileUpload = require("express-fileupload");

//tell express to use fileUpload to upload images
app.use(fileUpload());

//import the flash module
const flash = require("connect-flash");

//register the middleware with app
app.use(flash());

//connect DB with mongoose
mongoose.connect(
  "mongodb+srv://Avenkatesh:Anoop*1996@cluster0.2nkif.mongodb.net/Assignment2DB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//connect ejs with express
app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static("public"));
app.use(express.static('js'));

//all controllers

const authMiddleware = require("./controllers/authMiddleware");
const authMiddlewareAppointment = require("./controllers/authMiddlewareAppointment");

const homecontroller = require("./controllers/dashboard");
app.get("/", homecontroller);

const drivercontroller = require("./controllers/drivercon");
app.get("/driver", drivercontroller);

const examinercontroller = require("./controllers/examinercon");
app.get("/examiner", examinercontroller);

const admincontroller = require("./controllers/admincon");
app.get("/admin", admincontroller);

const logincontroller = require("./controllers/logincon");
app.get("/login", logincontroller);

const signupcontroller = require("./controllers/signincon");
app.get("/signup", signupcontroller);

const g2testcontroller = require("./controllers/g2testcon");
app.get("/g2test/", authMiddleware, g2testcontroller);

// ***********Assignement 4************

const appointmentcontroller = require("./controllers/appointmentcon");
app.get("/appointment", authMiddlewareAppointment, appointmentcontroller);

const getSlotsController2 = require('./controllers/getSlots2')
app.get('/getslots/g2test/:date',bodyParser.urlencoded({ extended: true }),getSlotsController2)


const getSlotsController = require('./controllers/getSlots')
app.get('/getslots/:date',bodyParser.urlencoded({ extended: true }),getSlotsController)


const storetoappointmentcontroller = require("./controllers/storetoappointment");
app.post(
  "/storeto/appointment/",
  bodyParser.urlencoded({ extended: true }),
  storetoappointmentcontroller
);

const storetoappointmentcontroller2 = require("./controllers/updatetoappointmenttbyid");
app.post(
  "/storeto/appointment/update",
  bodyParser.urlencoded({ extended: true }),
  storetoappointmentcontroller2
);

const posttogtestcontroller = require("./controllers/posttogtest");
app.post(
  "/gtest",
  bodyParser.urlencoded({ extended: true }),
  posttogtestcontroller
);

const gtestcontroller = require("./controllers/gtestcon");
app.get("/gtest", authMiddleware, gtestcontroller);

const registerusercontroller = require("./controllers/registeruser");
app.post(
  "/users/register",
  bodyParser.urlencoded({ extended: true }),
  registerusercontroller
);

const loginusercontroller = require("./controllers/loggedinuser");
app.post(
  "/users/login",
  bodyParser.urlencoded({ extended: true }),
  loginusercontroller
);

const storetogtestcontroller = require("./controllers/storegtotest");
app.post(
  "/storeto/gtest/",
  bodyParser.urlencoded({ extended: true }),
  storetogtestcontroller
);

const storetogtestcontroller2 = require("./controllers/updatetog2testbyid");
app.post(
  "/storeto/gtest/update",
  bodyParser.urlencoded({ extended: true }),
  storetogtestcontroller2
);

const logout = require("./controllers/logout");
app.get("/logout", bodyParser.urlencoded({ extended: true }), logout);


const bookAppointmentController = require('./controllers/appointment')
app.post('/user/appointment', bodyParser.urlencoded({ extended: true }),bookAppointmentController)

const updatetogtestcontroller = require("./controllers/updatetogtest");
app.post(
  "/gtest/updated/:id",
  bodyParser.urlencoded({ extended: true }),
  updatetogtestcontroller
);




app.listen(5003, () => console.log(" App starts using port 5000 "));

// Student Name: ANOOP VENKATESH
// Student No: 8750864

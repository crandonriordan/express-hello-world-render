/*
  Include express and passport packages.
*/
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/config");
const ProfileController = require("./controllers/ProfileController");
const DashboardController = require("./controllers/DashboardController");
const LocalStrategy = require("passport-local").Strategy;

/*
  Include the user model for saving to MongoDB VIA mongoose
*/
const User = require("./models/User");

/*
  Database connection -- We are using MongoDB for this tutorial
*/
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
mongoose.connect(config.mongodbUrl);
const db = mongoose.connection;

const app = express();

/*
  Session configuration and utilization of the MongoStore for storing
  the session in the MongoDB database
*/
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: config.jwtSecret,
    store: MongoStore.create({ mongoUrl: config.mongodbUrl }),
    cookie: { maxAge: 600 * 1000 },
  })
);

/*
  Setup the local passport strategy, add the serialize and 
  deserialize functions that only saves the ID from the user
  by default.
*/
const strategy = new LocalStrategy(User.authenticate());
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

/*
  Beyond this point is all system specific routes.
  All routes are here for simplicity of understanding the tutorial

  /register -- Look closer at the package https://www.npmjs.com/package/passport-local-mongoose
  for understanding why we don't try to encrypt the password within our application
*/
app.post("/register", function (req, res) {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
});

/*
  Login routes -- This is where we will use the 'local'
  passport authenciation strategy. If success, send to
  /login-success, if failure, send to /login-failure
*/
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  }),
  (err, req, res, next) => {
    if (err) next(err);
  }
);

app.get("/login-failure", (req, res, next) => {
  console.log(req.session);
  res.send("Login Attempt Failed.");
});

app.get("/login-success", (req, res, next) => {
  console.log(req.session);
  res.send("Login Attempt was successful.");
});

app.get("/logout", (req, res) => {
  // Destroy the user's session to log them out
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    // Redirect the user to a logout success or login page
  });
});

// setup routes
app.use("/profile", ProfileController);
app.use("/dashboard", DashboardController);

app.listen(8000, () => {
  console.log("Server started.");
});

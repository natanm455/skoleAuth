require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { kStringMaxLength } = require("buffer");

/////////////// Pakker brukt for autentisering ///////////////
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = require("express")();

/////////////// Bruk av locale ressurser ///////////////
app.use(express.static("public"));

/////////////// valgte view engine ///////////////
app.set("view engine", "ejs");

/////////////// body parser ///////////////
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/////////////// session konfigurasjon ///////////////

app.use(
  session({
    secret: "our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

/////////////// Start session og bruk passport for session håndtering  ///////////////

app.use(passport.initialize());
app.use(passport.session());

/////////////// Koble opp mot databasen ///////////////

mongoose.connect('mongodb://admin:Banan3232@192.168.0.14:27017/skoleAuth?authSource=admin')

/////////////// Passport strategi ///////////////

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());


/////////////// Cookies handler ///////////////

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/////////////// GET requests  ///////////////

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/innhold", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("innhold");
  } else {
    res.redirect("/login");
  }
});


/////////////// Registrering handler ///////////////

app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/innhold");
        });
      }
    }
  );
});

/////////////// Logg inn handler ///////////////

app.post("/login", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      res.redirect("/login");
      console.log(err);
    } else {
      passport.authenticate("local", {
        failureMessage: true,
        failureRedirect: "/login",
        successRedirect: "/innhold",
      })(req, res, next);
    }
  });
});


/////////////// Hvilken som helst error handler fra serveren ///////////////

app.use((req, res, next) => {
  res.status(404);
  res.render("error");
});

/////////////// Hvilen port serveren skal kunne kjøre på ///////////////

app.listen(80, () => {
  console.log("Server running on port 80");
});

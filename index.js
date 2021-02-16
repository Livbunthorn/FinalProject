const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./server/routes/admin");
const path = require("path");
const connectDB = require("./server/database/database");

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var MemoryStore = require("memorystore")(expressSession);
const passport = require("passport");
const flash = require("connect-flash");

// const name = "thorn";
app.set("view engine", "ejs");

app.set("views", [__dirname + "/view/user", __dirname + "/view/admin"]);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("random"));

app.use(
  expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
  })
);

// app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.error = req.flash("error");
  next();
});

app.use(routes);
connectDB();
app.listen(4000);

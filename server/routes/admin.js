const express = require("express");
const routes = express.Router();
const adminController = require("../controllers/adminController");
const adminRender = require("../service/adminRender");
const userRender = require("../service/userRender");
const user = require("../model/user");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
require("../controllers/passportLocal")(passport);

routes.get("/help", (req, res) => {
  res.render("help");
});
//user
routes.get("/", userRender.homePage);
routes.get("/detail", userRender.detilProduct);
routes.get("/detailUser", userRender.detailProductUser);
//admin
routes.get("/home", checkAuth, userRender.homeUserPage);
routes.get("/admin", checkAuth, adminRender.adminPage);
routes.get("/add-product", adminRender.newProduct);
routes.get("/update-product", adminRender.editProduct);
//api
routes.post("/api/admin", adminController.adminCreate);
routes.get("/api/admin", adminController.adminRead);
routes.put("/api/admin/:id", adminController.adminUpdate);
routes.delete("/api/admin/:id", adminController.adminDelete);

//auth
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0"
    );
    next();
  } else {
    res.redirect("/");
  }
}
routes.get("/admin", (req, res) => {
  res.render("admin");
});
routes.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { logged: true });
  } else {
    res.render("index", { logged: false });
  }
});

routes.get("/signin", (req, res) => {
  res.render("signin");
});

routes.get("/signup", (req, res) => {
  res.render("signup");
});

routes.post("/signup", (req, res) => {
  // get all the values
  const { email, username, password, confirmpassword } = req.body;
  // check if the are empty
  if (!email || !username || !password || !confirmpassword) {
    res.render("signup", {
      err: "All Fields Required !",
    });
  } else if (password != confirmpassword) {
    res.render("signup", {
      err: "Password Don't Match !",
    });
  } else {
    user.findOne({ $or: [{ email: email }, { username: username }] }, function (
      err,
      data
    ) {
      if (err) throw err;
      if (data) {
        res.render("signup", {
          err: "User Exists, Try Logging In !",
          // csrfToken: req.csrfToken(),
        });
      } else {
        bcryptjs.genSalt(12, (err, salt) => {
          if (err) throw err;
          bcryptjs.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user({
              username: username,
              email: email,
              password: hash,
            }).save((err, data) => {
              if (err) throw err;

              res.redirect("/signin");
            });
          });
        });
      }
    });
  }
});

routes.post("/signin", (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/signin",
    successRedirect: "/home",
    failureFlash: true,
  })(req, res, next);
});

routes.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = routes;

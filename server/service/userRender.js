const axios = require("axios");

//user page
exports.homePage = function (req, res) {
  axios
    .get("http://localhost:4000/api/admin")
    .then(function (response) {
      res.render("home", { admins: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.homeUserPage = function (req, res) {
  axios
    .get("http://localhost:4000/api/admin")
    .then(function (response) {
      res.render("homeuser", { admins: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.detilProduct = (req, res) => {
  res.render("detail_product");
};
exports.signinPage = function (req, res) {
  res.render("signin");
};
exports.signupPage = function (req, res) {
  res.render("signup");
};
exports.detailProductUser = (req, res) => {
  res.render("detail");
};

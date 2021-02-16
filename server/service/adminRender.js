const axios = require("axios");

exports.adminPage = (req, res) => {
  axios
    .get("http://localhost:4000/api/admin")
    .then(function (response) {
      res.render("admin", { admins: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.newProduct = (req, res) => {
  res.render("add_product");
};
exports.editProduct = (req, res) => {
  axios
    .get("http://localhost:4000/api/admin", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_product", { admin: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

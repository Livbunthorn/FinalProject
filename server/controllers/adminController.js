const adminDB = require("../model/admin");
const axios = require("axios");

//api

//create
exports.adminCreate = (req, res) => {
  //validation
  if (!req.body) {
    res.status(400).send({ message: "can not empty" });
    return;
  }
  //new product
  const admin = new adminDB({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    discount: req.body.discount,
    detail: req.body.detail,
    stock: req.body.stock,
    category: req.body.category,
  });
  admin.save(admin).then((data) => {
    res.redirect("/admin").catch((err) => {
      console.log(err.message);
      res.send(err);
    });
  });
};
//read

exports.adminRead = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    adminDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    adminDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
};

//update
exports.adminUpdate = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  adminDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
        res.redirect("/admin");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};
//delete

exports.adminDelete = (req, res) => {
  const id = req.params.id;

  adminDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

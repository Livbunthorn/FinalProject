const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  discount: String,
  price: String,
  detail: String,
  stock: Date,
  category: String,
});

const adminDB = new mongoose.model("admin", adminSchema);

module.exports = adminDB;

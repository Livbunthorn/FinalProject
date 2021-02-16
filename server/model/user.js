// const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");

// const userShema = new mongoose.Schema({
//   username: String,
//   email: {
//     type: String,
//     unique: true,
//   }, //for use mongoose with encryption
//   password: String,
// });

// const secret = "thisisourlittesecret.";
// userShema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); //for use mongoose with encryption

// const User = new mongoose.model("vigor", userShema);
// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },


});

module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");

//this is the user  model Schema which states that all the keys of user  document will not more than 
//these given keys and of specific types mentioned also

const userModelSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { required: true, type: String },
  dob: { reqired: true, type: Date },
  password: { required: true, type: String },
 
});

const UserModel = mongoose.model("user", userModelSchema);

module.exports = { UserModel };
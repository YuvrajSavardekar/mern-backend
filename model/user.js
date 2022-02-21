const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }]
});

// for faster access when query with email(e.g. .find({ email: email })),
// but it don't check that it is unique or not so, we install mongoose-unique-validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

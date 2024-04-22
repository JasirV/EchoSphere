const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordRestSchema = Schema({
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  token: String,
  CreatedAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("PasswordReset", passwordRestSchema);

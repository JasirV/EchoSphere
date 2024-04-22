const mongoose = require("mongoose");
const { schema } = require("./Message");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);

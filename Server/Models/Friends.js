const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema(
  {
    requestTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requestStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    requestFrom: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", FriendSchema);

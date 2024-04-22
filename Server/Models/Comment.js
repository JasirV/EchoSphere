const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  rid: { type: Schema.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  from: { type: String },
  replyAt: { type: String },
  comment: { type: String },
  created_At: { type: Date, default: Date.now },
  updated_At: { type: Date, default: Date.now },
  like: [{ type: String }],
});

const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },
    comment: { type: String, required: true },
    from: { type: String, required: true },
    replies: [ReplySchema],
    likes: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);

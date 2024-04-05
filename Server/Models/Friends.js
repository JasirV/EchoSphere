const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    requestTo: { type: Schema.Types.ObjectId, ref: 'user' },
    requestFrom: { type: Schema.Types.ObjectId, ref: 'user' },
    requestStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model("friend", FriendSchema);

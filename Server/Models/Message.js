const mongoose =require('mongoose')
const Schema=mongoose.Schema;
const MessageSchmea=new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String},
    reciver: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
 }, {timestamps:true})

 module.exports = mongoose.model("Message", MessageSchmea);
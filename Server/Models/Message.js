const mongoose =require('mongoose')
const Schema=mongoose.Schema;
const MessageSchmea=new Schema({
    chatId:{type:String},
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String},
 }, {timestamps:true})

 module.exports = mongoose.model("Message", MessageSchmea);
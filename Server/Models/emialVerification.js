const mongoose =require('mongoose')
const Schema=mongoose.Schema;

const emailVerificationSchema=Schema({
    userId:String,
    token:String,
    createAt:Date,
    expiresAt:Date
})

module.exports=mongoose.model('Verification',emailVerificationSchema)

const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Comment=require('./Comment')
const Reaction=require('./Reactions')



const PostSchema=new Schema(
    {
        userId:{type:Schema.Types.ObjectId,ref:'user'},
        description:{type:String,required:true},
        image:{type:String},
        likes:[{type:String}],
        comment:[{type:Schema.Types.ObjectId,ref:'comment'}]
    },
    {timestamps:true}
);
module.exports=mongoose.model("post",PostSchema)
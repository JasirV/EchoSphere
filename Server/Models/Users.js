const monsgoose=require('mongoose')
const Schema=monsgoose.Schema;
const bcrypt=require('bcryptjs')
const Post=require('./Post')
const Comment=require('./Comment')
const Reaction=require('./Reactions')
const Friends=require('./Friends')
const Notificationi=require('./Notification')
const {generateFromEmail}=require('unique-username-generator');
const { stringify } = require('uuid');

const UserSchema=new Schema(
    {
        firstName: {
          type: String,
          required: [true, "First Name is Required!"],
        },
        lastName: {
          type: String,
          required: [true, "Last Name is Required!"],
        },
        email: {
          type: String,
          required: [true, " Email is Required!"],
          unique: true,
        },
        password: {
          type: String,
          required: [true, "Password is Required!"],
          minlength: [6, "Password length should be greater than 6 character"],
          select: true,
        },
        location: { type: String },
        profession: { type: String },
        friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
        views: [{ type: String }],
        verified: { type: Boolean, default: false },
        photo:{
            type:String,
            default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        },
      },
      { timestamps: true }
    );

//Post removeing

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Post.deleteMany({owner:user._id});
    next()
});

//remove reactions

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Reaction.deleteMany({owner:user._id})
    next();
})

//remove Comment 

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Comment.deleteMany({owner:user._id})
    next()
})



//remove Friends

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Friends.deleteMany({
        $or:[{sender:user._id},{recipint:user._id}]
    })
    next()
})

//remove notification 

UserSchema.pre('remove',async (next)=>{
    const user=this
    await Notificationi.deleteMany({
        $or:[{sender:user._id},{recipint:user._id}]
    })
    next()
})


//generate Username

UserSchema.pre('save',(next)=>{
    if(this.isNew){
        const user=this;
        user.userName=generateFromEmail(user.email,4)
    }
    next();
})

  

module.exports=monsgoose.model('user',UserSchema)
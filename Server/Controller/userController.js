const UserSchema=require("../Models/Users")
const passwordReset=require('../Models/resetPassword')
const FriendSchema=require('../Models/Friends')
const CommentSchema=require('../Models/Comment')
const PostSchema=require('../Models/Post')
const bcrypt =require('bcryptjs');
const {sendVerificationEmail,resetPasswordLink} = require("../Utils/sendEmail");
const { hashStrting, comparePassword, tokengenerator } = require("../Utils/jwt");
const path = require('path');
const { json } = require("body-parser");

const register=async(req,res)=>{
    const {firstName,lastName,email,password,userName}=req.body;

    //Validation

    if(!firstName||!lastName||!email||!password){
        return res.status(400).json({
            status:'fail',
            message:"fil The Form Complele"
        })
    }
    try {
        const userExit= await UserSchema.findOne({email})

        if(userExit){
            return res.status(400).json({
                status:"success",
                message:'This User Olderay exist'
            })
        }
        const hashedPassword =await hashStrting(password)
        const user=await UserSchema.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            
        })
        const token=tokengenerator(user._id) 
        sendVerificationEmail(user,res,token)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
}

const loginUser=async (req,res)=>{
    const { userName, password } = req.body;
    const {email}=req.body;

    // const respons=await ChekEmail()
    // $or: [{ userName: userName },
    const user = await UserSchema.findOne(  { email: email }).select('+password');
    if(!user){
        return res.status(400).json({
            status:'fail',
            message:"Invalid Input"
        })
    }
    if(!user?.verified){
        return res.status(404).json({
            status:'failed',
            message:'User email is not verified .Check your email account and verify your eamil'
        })
    }
    if(!user.password){
        return res.status(400).json({
            status:"fail",
            message:'Invalid Inputs'
        })
    }
    //comapre password
    const matchPassword=await comparePassword(password,user.password);
    if(!matchPassword){
        return res.status(401).json({
            status:'fail',
            message:'Authentication Failed'
        })
    }
    const token=tokengenerator(user._id)

    res.status(201).json({
        status:'succes',
        message:'successfully loged',
        data:user,
        token:token
        
    })
}

//RESET PASSWORD

// const requestPasswordReset=async(req,res)=>{
//     const {email}=req.boby;
//     const user=await UserSchema.findOne({email})
//     if(!user){
//         return res.status(404).json({
//             status:'fail',
//             message:'Email address not found'
//         })
//     }
//     const olddata=await passwordReset.findOne({email});
//     if(olddata){
//         if(olddata.expiresAt>Date.now()){
//             return res.status(201).json({
//                 status:'Pending',
//                 massage:'Rest Password link has already been set tp your email'
//             })
//         }
//         await passwordReset.findOne({email});
//     }
//     await resetPasswordLink(user,res,user.token);
// }
// const resetPassword=async (req,res)=>{
//     const {userId,token}=req.params;
//     const user = await UserSchema.findById(userId)
//     if(!user){
//         return res.status(404).json({
//             status:"fail",
//             message:'This User Not Found '
//         })
//     }
//     const ressetPassword=await passwordReset.findOne({userId})
//     if(!ressetPassword){
//         return res.status(404).json({
//             status:'fail',
//             message:'Invalied link please try again'
//         })
//     }
//     const {expiresAt,token:resetToken}=resetPassword;
//     if(expiresAt<Date.now()){
//         return res.status(404).json({
//             status:'fail',
//             message:"Link as expried"
//         })
//     }else{
//         const isMatch=await comparePassword(token,resetToken);
//         if(!isMatch){
//             return res.status(404).json({
//                 status:'fail',
//                 message:'Invalid Reset password Link'
//             })
//         }
//     }
// }

const profilesetion = async (req, res) => {
    const  userId  = req.params.id; 
    if(!userId){
        return res.status(404).json({
            status:"fail",
            message:"Need For User"
        })    
    }
    const user= await UserSchema.findOne({_id:userId})
    if(!user){
        return res.status(404).json({
            status:'fail',
            message:'User Not Found The User Datas'
        })
    }
    res.status(200).json({
        status:"success",
        message:"successfully fecth the user",
        data:user
    })
}

const getUser=async (req,res)=>{
    const {userId}=req.body
    const {id} =req.params;

    const user= await UserSchema.findById(id??userId).populate({
        path:'friends',
        select:'-password'
    });
    if(!user){
        return res.status(200).json({
            status:'fail',
            message:'User Not Found'
        })
    }
    user.password=undefined;
    res.status(200).json({
        status:'success',
        user:user        
    })
}

const updateUser=async(req,res)=>{

    const {firstName,lastName,location,profileUrl,profession}=req.body

    if(!firstName||!lastName||!location||!profileUrl||!profession){
        return res.status(404).json({
            status:'fail',
            message:'Fill The fields'
        })
    }
    const {userId}=req.body.user;
    const updateData={
        firstName,lastName,location,profileUrl,profession,
        _id:userId
    }

    const user=await UserSchema.findByIdAndUpdate(userId,updateData,{new:true})
    await user.populate({path:'friends',select:'-password'})
    const token=tokengenerator(user?._id)
    user.password=undefined;
    res.status(200).json({
        status:'success',
        message:'User Update Successfully',
        user,
        token,
    })
}

//request


const friendReuest=async (req,res)=>{
const {userId}=req.body.user
console.log(req.body)
const {requestTo}=req.body; 
const requestEx=await FriendSchema.findOne({
    requestForm:userId,
    requestTo
})
if(requestEx){
    return res.status(400).json({
        status:'fail',
        message:'Friend Request Already Sended'

    })
}
const accountEx=await FriendSchema.findOne({
    requestFrom:requestTo,
    requestTo:userId
})
if(accountEx){
return res.status(400).json({
    status:'fail',
    message:'Friend Request Already sent'
})
}
const nreReq=await FriendSchema.create({
    requestTo,
    requestFrom:userId
})
return res.status(201).json({
        status:'success',
        message:'Friend Request sent SuccessFully'
})
}

const getRequeset = async (req, res) => {
    try {
        const id  = req.params.id;
        console.log(id); 
        
        const requests = await FriendSchema.find({
            requestTo: id,
            requestStatus: 'Pending'
        })
        .populate({
            path: 'requestForm',
            select: 'firstName lastName profileUrl profession'
        })
        .limit(10)
        .sort({ _id: -1 });

        res.status(200).json({
            status: 'success',
            data: requests
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const acceptRequest=async(req,res)=>{
const id=req.body.user.userId
const {rid,status}=req.body
const requestEx=await FriendSchema.findById(rid);
if(!requestEx){
    return res.status(200).json({
        status:'fail',
        message:'No Request Found'
    })
}
const newRequest=await FriendSchema.findByIdAndUpdate(
    {_id:rid},
    {requestStatus:status}
    );

    if(status === "Accepted"){
        const user=await UserSchema.findById(id);
        user.friends.push(newRequest?.requestFrom);
        await user.save();
        const friend=await UserSchema.findById(newRequest?.requestFrom);
        friend.friends.push(newRequest?.requestTo);
        await friend.save()
    }
    res.status(201).json({
        status:'success',
        message:'Friend Request' +status
    })
}
const profileViews=async (req,res)=>{
const {userId}=req.body.user;
const {id}=req.body;
const user =await UserSchema.findById(id)
user.views.push(userId);
await user.save()
res.status(201).json({
    status:'success',
    message:'SuccessFully add The friend For View List'
})
}


const suggestedFriends = async (req, res) => {
    const { id } = req.body;
    let queryObject = {};
    queryObject._id = { $ne: id };
    queryObject.friends = { $nin: id };
    
    let queryResult = UserSchema.find(queryObject)
                                   .limit(15)
                                   .select('firstName lastName profileUrl profession');
    
    const suggestFriends = await queryResult;
    
    res.status(200).json({
        status: 'success',
        data: suggestFriends,
    });
}
const createPost=async(req,res)=>{
    const id = req.body.id;
    const{description,image}=req.body
    console.log(id,"id" + description,"description" +image,"image");
    if(!description){
        return res.status(400).json({
            status:'fail',
            message:'You Must Provide a Description'
        })
    }
    const post=await PostSchema.create({
        userId,
        description,
        image,
    })
    res.status(200).json({
        status:'success',
        message:'Post Created SuccessFully',
        data:post
    })
}

const getPost=async(req,res)=>{
    const {userId}=req.body.user;
    const {search}=req.body

    const user=await UserSchema.findById(userId);
    const friends=user?.friends?.toString().split(',')??[];
    friends.push(userId)

    const searchPostQuery={
        $or:[
            {description:{$regex:search,$options:'i'},},
        ],
    };

    const posts =await PostSchema.find(search?searchPostQuery:{}).populate({
        path:'userId',
        select:'firstName lastName location profileUrl -password'
    }).sort({_id:-1});
    const friendsPosts=posts?.filter((post)=>{
        return friends.includes(post?.userId?._id.toString())
    });
    const otherPosts=posts?.filter((post)=> !friends.includes(post?.userId?._id.toString()))

    let postsRes=null
    if(friendsPosts?.length >0){
        postsRes=search ? friendsPosts :[...friendsPosts,...otherPosts]
    }else{
        postsRes=posts
    }

    res.status(200).json({
        status:'success',
        message:'successfully',
        data:postsRes
    })
}

const getUserPost=async(req,res)=>{
    const {id}=req.params;
    const post=await PostSchema.find({userId:id}).populate({path:'userId',select:'firstName lastName location profileUrl -password'}).sort({_id:-1})

    res.status(200).json({
        status:"suceess",
        message:'suceesfully',
        data:post
    })
}
const getComments=async(req,res)=>{
    const {postId} =req.params;

    const postComments=await CommentSchema.find({postId})
    .populate({path:'userId',
select:"firstName lastName location profileUrl -password" 
}).populate({path:'replies.userId',select:'firstName lastName locationi profileUrl -password'})
.sort({_id:-1});

res.status(200).json({
    status:"success",
    message:"successFully",
    data:postComments
})
}

const likePost=async (req,res)=>{
    const {userId}=req.body.user;
    const {id}=req.params;
    const post =await PostSchema.findById(id);
    const index=post.likes.findIndex((pi)=>pi===String(userId));

    if(index===-1){
        post.likes.push(userId);
    }else{
        post.likes=post.likes.filter((pi)=>pi!==String(userId))
    }
    const newPost=await PostSchema.findByIdAndUpdate(id,post,{new:true})

    res.status(200).json({
        status:'success',
        message:"successFully",
        data:newPost
    })
}

const likeComment=async(req,res)=>{
    const {userId}=req.body.user
    const {id,rid}=req.params;

    if(rid===undefined||rid === null ||rid ==="false"){
        const Comment =await CommentSchema.findById(id)
        const index =Comment.likes.findIndex((cl)=>cl===String(userId));
        if(index === -1){
            Comment.likes.push(userId)
        }else{
            Comment.likes =Comment.likes.filter((i)=>i!==String(userId))
        }
        const update=await CommentSchema.findByIdAndUpdate(id,Comment,{
            new:true
        });
        res.status(201).json(update);
    }else{
        const replyComments=await CommentSchema.findOne(
            {_id:id},
            {
                replies:{
                    $elemMatch:{_id:rid}
                }
            }
        )
    };
    const index =replyComments?.replies[0]?.likes.findIndex((i)=>i===String(userId))
    if(index === -1 ){
        replyComments.replies[0].likes.push(userId)
    }else{
        replyComments.replies[0].likes=replyComments.replies[0]?.likes.filter((i)=>i!== String(userId))
    }
    const query={_id:id,"replies._id":rid}
    const updated={
        $set:{
            "replies.$.likes":replyComments.replies[0].likes,
        }
    }
    const result=await CommentSchema.updateOne(query,updated,{new:true});
   res.status(201).json(result); 
}
const commentPost =async (req,res)=>{
    const {comment,from}=req.body;
    const {userId}= req.body.user
    const {id} =req.params;

    if(comment === null){
        res.status(404).json({
            status:"fail",
            message:'Comment is required'
        })
    }
    const newComment= new CommentSchema({comment,from,userId,postId:id})
    await newComment.save()

    const post =await PostSchema.findById(id)
    post.comment.push(newComment._id)

    const updatePost=await PostSchema.findByIdAndUpdate(id,post,{new:true})
    res.status(201).json(newComment)
}

const replayComments= async(req,res)=>{
    const {userId}=req.body.user;
    const {comment,replyAt,from}=req.body
    const {id}=req.params;

    if(comment === null ){
        return res.status(400).json({
            message:'Comment is Required'
        })
    }
    const commentInfo=await CommentSchema.findById(id);
    commentInfo.replies.push({
        comment,
        replyAt,
        from,
        userId,
        created_At:Date.now()
    })
    commentInfo.save()
    res.status(200).json(commentInfo)
}

const deletePost =async (req,res)=>{
    const {id} =req.params;
    await PostSchema.findByIdAndDelete(id)

    res.status(200).json({
        status:'succes',
        message:'succesFully Deleted'
    })
}



module.exports={
    loginUser,register,profilesetion,getUser,updateUser,friendReuest,getRequeset,acceptRequest,profileViews,suggestedFriends,
    createPost,getPost,getUserPost,getComments,likePost,likeComment,commentPost,replayComments,deletePost,
}
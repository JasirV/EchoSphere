const express=require('express')
const userController=require('../Controller/userController')
const userRouter=express.Router()


userRouter.post('/register',userController.register)
.post("/login",userController.loginUser)
.get('/profilesection/:id',userController.profilesetion)
//user Update and get user 
.post('/getUser/:id?',userController.getUser)
.put('/updateUser',userController.updateUser)

//friend request

.post('/friendRequest',userController.friendReuest)
.post('/getRequeset/',userController.getRequeset)

//accept/deny 
.post('/acceptRequest',userController.acceptRequest)

//view Profile 
.post('/profileViews',userController.profileViews) 

 //suggestedFriends

 .post ('/suggestFriends',userController.suggestedFriends)


module.exports=userRouter
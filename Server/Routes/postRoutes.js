const express=require('express')
const userController=require('../Controller/userController')
const postRouter=express.Router()


//createPost
postRouter.post('/createPost',userController.createPost)
.post('/' ,userController.getPost)
.post('/getUserPost/:id',userController.getUserPost)

//comments
.get('/comments/:postId',userController.getComments)

//like

.post('/like/:id',userController.likePost)
.post('/likeComment/:id/:rid?',userController.likeComment)
.post('/comment/:id',userController.commentPost)
.post('/replayComment/:id',userController.replayComments)

//delete 

.delete('/:id',userController.deletePost)
module.exports=postRouter
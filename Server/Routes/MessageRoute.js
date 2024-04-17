const express =require('express')
const MessageController=require('../Controller/MessageController')
const MessaageRouter=express.Router()

MessaageRouter.post("/",MessageController.addMessage)
.get("/:chadId",MessageController.getMessages)


module.exports=MessaageRouter
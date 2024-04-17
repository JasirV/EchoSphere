const express=require('express')
const ChatRoute=express.Router()
const ChatControllers=require('../Controller/ChatControllers')
ChatRoute.post('/',ChatControllers.createChat)
.get('/:userId',ChatControllers.userChat)
.get('/find/:firstId/:secondId',ChatControllers.findChat)

module.exports=ChatRoute
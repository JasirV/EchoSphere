const ChatSchema =require('../Models/Message')

const createChat=async (req,res)=>{
    const newChat=new ChatSchema({
        members:[req.body.senderId,req.body.receiverId]
    });
    try {
        const result=await newChat.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const userChat=async (req,res)=>{
    try {
        const chat =await ChatSchema.find({
            members:{$in:[req.params.userId]}
        });
        res.status(200).json(chat)
    } catch (error) { 
        res.status(500).json(error) 
    }
}

const findChat=async (req,res)=>{
    try {
        const chat=await ChatSchema.findOne({
            menubar:{$all:[req.params.firstId,req.params.secondId]}
        });
        res.status(500).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports={findChat,userChat,createChat}
const ChatSchema = require("../Models/Message");

const addMessage = async (req, res) => {
  const { sender, text, conversationId } = req.body.message;
  // console.log(req.body.message);
  const message = new ChatSchema({
    conversationId,
    sender,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const result = await ChatSchema.find({
      $or: [{ senderId: chatId }, { chatId: chatId }],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addMessage, getMessages };

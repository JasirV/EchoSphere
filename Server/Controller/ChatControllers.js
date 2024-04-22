const ChatSchema = require("../Models/ChatModel");

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: 'senderId or receiverId is missing or invalid' });
  }

  const newChat = new ChatSchema({
    members: [senderId, receiverId],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error saving chat:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }

    res.status(500).json({ message: 'Failed to create chat', error: error.message });
  }
};

const userChat = async (req, res) => {
  try {
    const chat = await ChatSchema.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await ChatSchema.findOne({
      menubar: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(500).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { findChat, userChat, createChat };

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId , io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: "Message Sent Successfully", newMessage });
  } catch (err) {
    console.error("Error in sendMessage:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]); // Use 200 OK for an empty result set
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getMessages:", err.message); // Corrected error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};

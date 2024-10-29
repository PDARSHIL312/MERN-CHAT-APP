import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

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
      participants: [senderId, userToChatId],
    }).populate("messages"); /// so what populate does is like if we do not use populate thhan it will simply return all the id that we store in array but what populate does is it will provide the whole messege instead of message id means the formate that ii have specified!!

    if (!conversation) return res.status(201).json([]);
    const messages = conversation.messages;

    res.status(201).json(messages);
  } catch (err) {
    console.error("Error in sendMessage:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

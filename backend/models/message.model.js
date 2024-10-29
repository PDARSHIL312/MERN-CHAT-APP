import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    //createdAt And UpdatedAt => message.createdAt will send when this message is created
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

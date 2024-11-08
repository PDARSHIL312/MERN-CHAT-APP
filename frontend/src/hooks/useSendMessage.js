import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

function useSendMessage() {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    // console.log(message);
    try {
      const res = await fetch(
        `http://localhost:7000/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      // Check if the response is JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages([...messages, data]);
      } else {
        throw new Error("Expected JSON response but received something else.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;

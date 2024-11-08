import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:7000/api/messages/${selectedConversation._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch messages. Please try again.");
      }

      const data = await res.json().catch(() => {
        throw new Error("Invalid JSON response from server.");
      });
      console.log(data);
      if (data.error) throw new Error(data.error);

      setMessages(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  const refetchMessages = async () => {
    if (selectedConversation?._id) getMessages();
  };

  return { messages, loading, refetchMessages };
};

export default useGetMessages;

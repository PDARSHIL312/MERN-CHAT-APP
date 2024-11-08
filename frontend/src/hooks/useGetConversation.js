import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:7000/api/user", {
          method: "GET",
          credentials: "include", // This includes cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch conversations. Please try again.");
        }

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast.error(error.message && "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getConversations();

  }, []);

  return { loading, conversations };
}

export default useGetConversation;

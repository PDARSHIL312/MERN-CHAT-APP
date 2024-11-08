import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:7000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // Check if response is OK
      if (!res.ok) {
        throw new Error("Failed to log out. Please try again.");
      }

      // Try to parse JSON, handle empty response gracefully
      const data = await res.json().catch(() => null);

      // Check for server error in response
      if (data && data.error) {
        throw new Error(data.error);
      }

      // If successful, clear the user data
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (e) {
      console.error(e);
      toast.error(e.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;

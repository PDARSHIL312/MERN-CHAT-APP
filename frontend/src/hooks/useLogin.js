import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = validateInputs({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      // Handle non-OK responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          message: "An unexpected error occurred. Please try again.",
        }));
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Store user data and update context
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login successful!");
      return true; // Indicate success for optional redirection
    } catch (e) {
      toast.error(e.message);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

// Validation helper function
function validateInputs({ username, password }) {
  if (!username || !password) {
    toast.error("Username and password are required");
    return false;
  }

  if (username.length < 3) {
    toast.error("Username must be at least 3 characters long");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useGetConversation from "../../hooks/useGetConversation.js";
import useConversation from "../../zustand/useConversation.js";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversation();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation check
    if (search.trim().length < 3) {
      toast.error("Search must be at least 3 characters.");
      return;
    }

    // Finding a matching conversation
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase().trim())
    );

    // Handle results
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Clear search input after selection
    } else {
      toast.error("No user found with that name.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;

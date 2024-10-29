import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in getting getUsersForSideBar ", error.message);
    res.status(500).json({ "error in getting getUsersForSideBar": error });
  }
};

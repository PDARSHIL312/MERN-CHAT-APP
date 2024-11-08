// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import generateTokenAndSetCookie from "../utils/generateToken.js";

// const signup = async (req, res) => {
//   //   console.log("loginUser", req);
//   try {
//     const { fullName, username, password, confirmPassword, gender } = req.body;

//     if (password != confirmPassword) {
//       return res.status(400).json({ error: "Password do not match" });
//     }

//     const user = await User.findOne({ username: username });

//     if (user) {
//       res.status(400).json({ error: "User Already exists" });
//     }

//     //HASH PASSWORD
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//     const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//     const newUser = await User.create({
//       fullName: fullName,
//       username: username,
//       password: hashedPassword,
//       gender: gender,
//       profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
//     });

//     if (newUser) {
//       // Generate new JWT Token
//       generateTokenAndSetCookie(newUser._id, res);

//       res.status(201).json({
//         _id: newUser._id,
//         fullName: newUser.fullName,
//         username: newUser.username,
//         profilePic: newUser.profilePic,
//       });
//     } else {
//       res.status(400).json({ error: "Invalid username" });
//     }
//   } catch (err) {
//     console.log("Error in the signUp", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user?.password || ""
//     );

//     if (!user || !isPasswordCorrect) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     generateTokenAndSetCookie(user._id, res);

//     res.status(201).json({
//       _id: user._id,
//       fullName: user.fullName,
//       username: user.username,
//       profilePic: user.profilePic,
//     });
//   } catch (err) {
//     console.log("Error in the Login", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const logout = (req, res) => {
//   try {
//     res.cookie("jwt", "", {
//       maxAge: 0,
//       expires: new Date(0), // explicitly set an expiration date in the past
//       path: "/",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (err) {
//     console.log("Error in the LogOut Controll", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export default { signup, login, logout };

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Helper function to generate token and set cookie
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10h", // token validity
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Protects cookie from being accessed by JavaScript
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "Lax", // Prevents CSRF in most cases
    maxAge: 60 * 60 * 1000 * 10, // 1 hour in milliseconds
  });
};

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Validate password complexity
    if (password.length < 6) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include an uppercase letter and a special character.",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT and set cookie
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error in signup:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error in logout:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { signup, login, logout };

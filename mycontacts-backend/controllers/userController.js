const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
//@desc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await user.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedPassword);

  const newUser = await user.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ _id: newUser.id, email: newUser.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
};

//@desc Authenticate a user
//@route POST /api/users/login
//@access public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const User = await user.findOne({ email });

  // Compare password with hashed password
  if (User && (await bcrypt.compare(password, User.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: User.username,
          email: User.email,
          id: User.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" },
    );
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
};

//@desc Get current user
//@route GET /api/users/current
//@access private
const getCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};

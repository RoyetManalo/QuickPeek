const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Snippet = require("../models/snippetModel");

// @desc    Register new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    throw new Error("Please input field");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //   Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   Create user
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      savedSnippets: user.savedSnippets,
      starredSnippets: user.starredSnippets,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login  user
// @route   POST api/users/login
// @access  Public

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Check for email
  const user = await User.findOne({ email });

  //  Check password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Get user data
// @route   Get api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(201).json(req.user);
});

const searchUser = asyncHandler(async (req, res) => {
  const searchQuery = req.query.query;
  const result = await User.aggregate([
    {
      $search: {
        index: "searchUser",
        text: {
          query: searchQuery,
          path: ["firstName", "lastName", "username"],
        },
      },
    },
    {
      $project: {
        password: 0, // excludes password on results
      },
    },
  ]);
  res.json(result);
});

const editUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);

  if (!user) {
    throw new Error("user not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (user._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedUser = await User.findByIdAndUpdate(req.user, req.body, {
    new: true,
  }).select("_id firstName lastName username email");
  res.status(200).json(updatedUser);
});

const getFollowers = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.user }).populate(
    "followers",
    "firstName lastName username email followers following"
  );
  res.status(201).json(user[0].followers);
});
const getFollowing = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.user }).populate(
    "following",
    "firstName lastName username email followers following"
  );
  res.status(201).json(user[0].following);
});

const getUserInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(201).json({
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  });
});

const addToFollowing = asyncHandler(async (req, res) => {
  // Make sure the current login user is the one who get the following
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $push: { following: req.body.id },
  });

  const followedUser = await User.findById(req.body.id);

  res.status(200).json({
    _id: followedUser.id,
    firstName: followedUser.firstName,
    lastName: followedUser.lastName,
    username: followedUser.username,
    email: followedUser.email,
  });
});

const removeToFollowing = asyncHandler(async (req, res) => {
  // Make sure the current login user is the one who get the following
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { following: req.body.id },
  });

  res.status(200).json(req.body.id);
});

const addToSavedSnippets = asyncHandler(async (req, res) => {
  // Make sure the current login user is the one who get the saved snippets
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $push: { savedSnippets: req.body.id },
  });

  console.log(req.body);

  let savedSnippets = await Snippet.findById(req.body.id);
  await savedSnippets.populate("user", "_id firstName lastName usernaame");
  console.log(savedSnippets);

  res.status(200).json(savedSnippets);
});

const removeToSavedSnippets = asyncHandler(async (req, res) => {
  // Make sure the current login user is the one who get the saved snippets
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { savedSnippets: req.body.id },
  });

  res.status(200).json(req.body.id);
});

// Generate jwt
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

module.exports = {
  registerUser,
  userLogin,
  getMe,
  searchUser,
  editUserInfo,
  getFollowers,
  getFollowing,
  getUserInfo,
  addToFollowing,
  removeToFollowing,
  addToSavedSnippets,
  removeToSavedSnippets,
};

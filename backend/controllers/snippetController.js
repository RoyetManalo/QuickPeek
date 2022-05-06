const asyncHandler = require("express-async-handler");
const Snippet = require("../models/snippetModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const getFeed = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.user }).select("-_id following");

  const userFollowing = user[0].following;

  const feed = await Snippet.find({
    user: {
      $in: userFollowing,
    },
  }).populate("user", "_id firstName lastName userName");

  res.json(feed);
});

// @desc    Get all snippets
// @route   GET api/snippets
// @access  private
const getSnippets = asyncHandler(async (req, res) => {
  // const snippets = await Snippet.find();
  const snippetsWithUser = await Snippet.find()
    .sort({ createdAt: "desc" })
    .populate("user", "_id firstName lastName userName");

  res.status(201).json(snippetsWithUser);
});

// @desc    Get my snippets
// @route   GET api/snippets
// @access  private

const getMySnippets = asyncHandler(async (req, res) => {
  const mySnippets = await Snippet.find({ user: req.user.id }).sort({
    createdAt: "desc",
  });
  res.status(201).json(mySnippets);
});

const getSavedSnippets = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.user }).populate({
    path: "savedSnippets",
    populate: { path: "user", select: "firstName lastName username" },
  });

  res.status(201).json(user[0].savedSnippets);
});

const getStarredSnippets = asyncHandler(async (req, res) => {
  // nested populate
  const user = await User.find({ _id: req.user }).populate({
    path: "starredSnippets",
    populate: { path: "user", select: "firstName lastName username" },
  });
  // .populate({ path: 'nested', populate: { path: 'deepNested' }})
  res.status(201).json(user[0].starredSnippets);
});

// @desc    Get other user snippets
// @route   GET api/snippets
// @access  private

const getUserSnippets = asyncHandler(async (req, res) => {
  const mySnippets = await Snippet.find({ user: req.body.id }).sort({
    createdAt: "desc",
  });
  res.status(201).json(mySnippets);
});

const createSnippet = asyncHandler(async (req, res) => {
  const { title, description, language, code } = req.body;

  if (!title || !description || !language || !code) {
    throw new Error("Please input field");
  }

  let snippet = await Snippet.create({
    title,
    description,
    language,
    code,
    user: req.user.id,
    star: [],
  });

  await snippet.populate("user", "_id firstName lastName userName");

  if (snippet) {
    res.status(201).json({
      _id: snippet.id,
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      code: snippet.code,
      user: snippet.user,
      star: snippet.star,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Review this
const updateSnippet = asyncHandler(async (req, res) => {
  const snippetToUpdate = await Snippet.findById(req.params.id);

  if (!snippetToUpdate) {
    throw new Error("Snippet not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (snippetToUpdate.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedSnippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedSnippet);
});

// @desc    Delete snipet
// @route   DELETE api/snippet/:id
// @access  Private
const deleteSnippet = asyncHandler(async (req, res) => {
  const snippetToDelete = await Snippet.findById(req.params.id);

  if (!snippetToDelete) {
    throw new Error("Snippet not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (snippetToDelete.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await snippetToDelete.remove();
  res.status(201).json({ id: req.params.id });
});

// @desc    Search snipet
// @route   GET api/snippet/search
// @access  Private
const searchSnippet = asyncHandler(async (req, res) => {
  const searchQuery = req.query.query;
  const userResult = await User.aggregate([
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
        _id: 1,
        // excludes password on results
      },
    },
  ]);

  const query = userResult.length > 0 ? userResult[0]._id : searchQuery;

  const searchResult =
    typeof query === "object"
      ? await User.aggregate([
          { $match: { _id: userResult[0]._id } },
          {
            $lookup: {
              from: "snippets",
              localField: "_id",
              foreignField: "user",
              as: "snippet",
            },
          },

          {
            $project: {
              _id: 0,
              snippet: 1,
            },
          },
        ])
      : await Snippet.aggregate([
          {
            $search: {
              index: "searchSnippet",
              text: {
                query: searchQuery,
                path: ["title", "description", "language", "code", "user"],
              },
            },
          },
        ]);

  if (searchResult.length > 0) {
    await User.populate(searchResult[0].snippet, {
      path: "user",
      select: { _id: 1, firstName: 1, lastName: 1, username: 1 },
    });
    await User.populate(searchResult, {
      path: "user",
      select: { _id: 1, firstName: 1, lastName: 1, username: 1 },
    });
  }

  res.json(searchResult);
});

// @desc    Add star
// @route   GET api/snippet/star/add/:id
// @access  Private

const addStar = asyncHandler(async (req, res) => {
  const snippetToAddStar = await Snippet.findById(req.params.id);

  if (!snippetToAddStar) {
    throw new Error("Snippet not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: { starredSnippets: req.params.id },
  });

  const updatedSnippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    {
      $push: { star: req.user },
    },
    { new: true }
  ).populate("user", "_id firstName lastName username");
  // console.log(updatedSnippet);
  res.status(200).json(updatedSnippet);
});

const unStar = asyncHandler(async (req, res) => {
  const snippetToUnStar = await Snippet.findById(req.params.id);
  console.log(snippetToUnStar);

  if (!snippetToUnStar) {
    throw new Error("Snippet not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { starredSnippets: req.params.id },
  });

  const updatedSnippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { star: req.user._id },
    },
    { new: true }
  ).populate("user", "_id firstName lastName username");
  res.status(200).json(updatedSnippet);
});

module.exports = {
  getFeed,
  getSnippets,
  getSavedSnippets,
  getStarredSnippets,
  getMySnippets,
  getUserSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  searchSnippet,
  addStar,
  unStar,
};

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Snippet = require("../models/snippetModel");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  // const searchQuery = req.query.query;
  // const result = await User.aggregate([
  //   {
  //     $lookup: {
  //       from: "snippets",
  //       localField: "user",
  //       foreignField: "_id",
  //       as: "Snippet",
  //     },
  //   },
  //   {
  //     $project: {
  //       password: 0,
  //     },
  //   },
  // ]);
  // res.json(result);

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
        password: 0, // excludes password on results
      },
    },
  ]);

  const snippetResult = await Snippet.aggregate([
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

  const result = { user: userResult, snippet: snippetResult };

  res.json(result);
});

module.exports = router;

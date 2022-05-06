const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  userLogin,
  getMe,
  getUserInfo,
  addToFollowing,
  removeToFollowing,
  addToSavedSnippets,
  removeToSavedSnippets,
  getFollowers,
  getFollowing,
  searchUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", userLogin);
router.get("/me", protect, getMe);
router.get("/search", protect, searchUser);
router.get("/getFollowers", protect, getFollowers);
router.get("/getFollowing", protect, getFollowing);
router.get("/profile/:id", protect, getUserInfo);
router.put("/following/add/:id", protect, addToFollowing);
router.put("/following/remove/:id", protect, removeToFollowing);
router.put("/savedsnippets/add/:id", protect, addToSavedSnippets);
router.put("/savedsnippets/remove/:id", protect, removeToSavedSnippets);

module.exports = router;

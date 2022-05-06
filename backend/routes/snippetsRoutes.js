const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  getFeed,
  getSnippets,
  getMySnippets,
  getUserSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  searchSnippet,
  addStar,
  unStar,
  getSavedSnippets,
  getStarredSnippets,
} = require("../controllers/snippetController");
const { protect } = require("../middleware/authMiddleware");

router.get("/feed", protect, getFeed);
router.get("/mysnippets", protect, getMySnippets);
router.get("/savedSnippets", protect, getSavedSnippets);
router.get("/starredSnippets", protect, getStarredSnippets);
router.get("/search", protect, searchSnippet);
router.post("/getUserSnippets", protect, getUserSnippets);
router.route("/").get(protect, getSnippets).post(protect, createSnippet);
router.route("/:id").put(protect, updateSnippet).delete(protect, deleteSnippet);
router.put("/star/add/:id", protect, addStar);
router.put("/star/remove/:id", protect, unStar);

module.exports = router;

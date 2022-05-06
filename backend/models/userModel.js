const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    followers: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    savedSnippets: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Snippet" },
    ],
    starredSnippets: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Snippet" },
    ],
    profilePicture: { type: Buffer },
  },
  {
    timestamps: true,
  }
);
// userSchema.index({ firstName: "text", lastName: "text", username: "text" });
module.exports = mongoose.model("User", userSchema);

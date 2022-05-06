const mongoose = require("mongoose");

const snippetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      text: true,
    },
    language: {
      type: String,
      required: [true, " Please add a language"],
    },
    code: {
      type: String,
      required: [true, " Please add a language"],
    },
    star: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// snippetSchema.index({
//   title: "text",
//   description: "text",
//   language: "text",
//   code: "text",
// });
module.exports = mongoose.model("Snippet", snippetSchema);

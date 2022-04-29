const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  name: { type: String, Unique: true },
  description: String,
  genres: String,
  pegi: Number,
  picture: String,
  like: { type: Number, Default: 0 },
  filename: String ,
  user_creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: {},
    },
  ],
});

const Content = mongoose.model("content", contentSchema);

module.exports = Content;

const User = require("../models/user.model");
const Post = require("../models/post.model");
const Like = require("../models/like.model");

// get all likes

const getAllLikes = async (req, res) => {
  const post_id = req.body.post_id;
  // check if post id is provided
  if (!post_id) {
    return res.status(400).json({ error: "Post id is required." });
  }
  // check if post exists
  const post = await Post.findOne({ _id: post_id }).exec();
  if (!post) {
    return res.status(400).json({ error: "Post not found." });
  }

  // get all likes
  res.json(post.likes);
};

// add like
// remove like

module.exports = {
  getAllLikes,
};

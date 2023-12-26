const User = require("../models/user.model");
const Post = require("../models/post.model");

// read all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    return res.status(400).json({ message: "No posts found." });
  }
  res.json(posts);
};

// Create new post
const createNewPost = async (req, res) => {
  const image = "";
  const likes = [];
  const comments = [];
  const { content, _id } = req.body;
  if (req.body.image) {
    image = req.body.image;
  }

  // validate data
  if (!content) {
    return res.status(400).json({ error: "Post content is required." });
  }

  if (!_id) {
    return res.status(400).json({ error: "User id is required." });
  }

  // check for existing user
  const foundUser = await User.findOne({ _id: _id }).exec();

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  try {
    const result = await Post.create({
      content: content,
      user: _id,
      image: image,
      likes: likes,
      comments: comments,
    });

    res.status(201).json({ success: `New post created.` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update post
const updatePost = async (req, res) => {
  user_id = req.body.user_id;
  post_id = req.body.post_id;

  if (!user_id) {
    return res.status(400).json({ error: "User id is required." });
  }

  if (!post_id) {
    return res.status(400).json({ error: "Post id is required." });
  }

  const post = await Post.findOne({ _id: post_id }).exec();

  if (!post) {
    return res.status(400).json({ error: "Post not found." });
  }

  if (post.user.toString() !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  // validate data
  if (req.body?.content) {
    post.content = req.body.content;
  }
  if (req.body?.image) {
    post.image = req.body.image;
  }

  const result = await post.save();

  res.json(result);
};

// delete post
const deletePost = async (req, res) => {
  user_id = req.body.user_id;
  post_id = req.body.post_id;
  if (!user_id) {
    return res.status(400).json({ error: "User id is required." });
  }

  if (!post_id) {
    return res.status(400).json({ error: "Post id is required." });
  }
  const post = await Post.findOne({ _id: post_id }).exec();

  if (!post) {
    return res.status(400).json({ error: "Post not found." });
  }

  const result = await post.deleteOne({ _id: post_id });

  res.json(result);
};

// get post by id
const getPostById = async (req, res) => {
  post_id = req.params.post_id;

  if (!post_id) {
    return res.status(400).json({ error: "Post id is required." });
  }

  const post = await Post.findOne({ _id: post_id }).exec();
  if (!post) {
    return res.status(400).json({ error: "Post not found." });
  }
  res.json(post);
};

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
  getPostById,
};

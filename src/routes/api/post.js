express = require("express");
const router = express.Router();
const postsControllers = require("../../controllers/posts.controllers");
const ROLE_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");

router
  .route("/")
  .get(postsControllers.getAllPosts)
  .post(postsControllers.createNewPost)
  .put(postsControllers.updatePost)
  .delete(postsControllers.deletePost);

router.route("/:post_id").get(postsControllers.getPostById);

module.exports = router;

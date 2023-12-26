express = require("express");
const router = express.Router();
const likesControllers = require("../../controllers/likes.controllers");
const ROLE_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");

router.route("/").get(likesControllers.getAllLikes);

module.exports = router;

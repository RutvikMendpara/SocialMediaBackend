const express = require("express");
const router = express.Router();
const logoutControllers = require("../../controllers/auth/logout.controllers");

router.get("/", logoutControllers.handleLogout);

module.exports = router;

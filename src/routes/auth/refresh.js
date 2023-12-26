const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/auth/refreshToken.controllers");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;

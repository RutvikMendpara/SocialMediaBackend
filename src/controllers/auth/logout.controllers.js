const User = require("../../models/user.model");

const handleLogout = async (req, res) => {
  // on client side, delete the cookie with the name "jwt"
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // No Content
  }

  const refreshToken = cookies.jwt;

  // is refreshToken in DB?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true, // safes
      sameSite: "None",
      secure: true,
    });

    return res.sendStatus(403); // No Content
  }

  // delete refreshToken from DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true, // safes
    sameSite: "None",
    secure: true,
  }); // secure: true - only servers with https , add in production

  res.sendStatus(204); // No Content
};
module.exports = { handleLogout };

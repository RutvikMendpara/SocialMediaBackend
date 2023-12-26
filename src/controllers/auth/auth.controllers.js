const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const foundUser = await User.findOne({ email: email }).exec();

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (isMatch) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: foundUser._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      {
        _id: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // save refresh token in database
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true, // safes
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      // secure: true, // only servers with https , add in production
    });

    res.json({ accessToken });
  } else {
    res.status(401).json({ error: "Invalid credentials." });
  }
};

module.exports = { handleLogin };

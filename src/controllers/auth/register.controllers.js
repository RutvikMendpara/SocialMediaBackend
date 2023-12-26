const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const { isValidEmail, isValidPassword } = require("../../utils/validator");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "username , email and password are required." });
  }

  // check for existing email
  const duplicate_email = await User.findOne({ email: req.body.email }).exec();

  if (duplicate_email) {
    return res.status(409).json({
      error: `Email : ${req.body.email} already exits try to login or use different email.`,
    }); // conflict
  }

  // check for existing user
  const duplicate_username = await User.findOne({
    username: req.body.username,
  }).exec();

  if (duplicate_username) {
    return res.status(409).json({
      error: `Email : ${req.body.username.trim()} already exits try to login with this username or use different username.`,
    }); // conflict
  }

  // work on user data

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email." });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({
      error:
        "Invalid password.  Requires at least one lowercase letter,  one uppercase letter, at least one digit (number), one special character. Minimum 8 in length.",
    });
  }

  try {
    // encrypt password
    const hashed_password = await bcrypt.hash(password, 10);

    // create new user and save to database
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashed_password,
    });

    res.status(201).json({ success: `New user ${username} created.` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };

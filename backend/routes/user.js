const express = require("express");
const router = express.Router();
const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUsername = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;
  const existingUsername = await User.findOne({ username: username });
  if (!existingUsername) {
    return res.status(400).json({ message: "User does not exist" });
  }

  bcrypt.compare(password, existingUsername.password, (err, result) => {
    if (result) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "secret") }];
      const token = jwt.sign({ authClaims }, "secret", {
        expiresIn: "2d",
      });

      return res.status(200).json({ id: existingUsername._id, token });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  });
});

module.exports = router;

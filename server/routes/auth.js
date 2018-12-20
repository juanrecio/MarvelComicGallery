const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.post("/login", function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(500).json({ message: "Error login" }) }
    if (!user) { return res.status(500).json({ message: "Error login" }) }

    req.logIn(user, function (err) {
      if (err) { return res.status(500).json({ message: "Error login" }) }
      return res.status(200).json(user);
    });
  })(req, res, next);
});


authRoutes.post("/signup", (req, res, next) => {
  const { username, password, mail } = req.body;
  if (username === "" || password === "" || mail === "") {
    res.status(500).json({ message: "Indicate username, password and mail" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(500).json({ message: "The username already exists" })
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      mail
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        req.login(user, (err) => {
          if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }
          res.status(200).json(user);
        });
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logout" });
});

authRoutes.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
})

module.exports = authRoutes;

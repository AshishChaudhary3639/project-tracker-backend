const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const userRoute = Router();
const jwt = require("jsonwebtoken");
userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const isUserExist = await UserModel.findOne({ email }); // taking user to check is already exist in DB or not
  console.log(isUserExist);
  if (isUserExist) {
    res.send({ err: "User already exist" });
  } else {
    bcrypt.hash(password, 4, async (err, hashed) => {
      // Hashing password plain text into some other formate
      // Store hashed in your password DB.
      if (!err) {
        try {
          // storing user data in database
          let userData = new UserModel({
            email: email,
            password: hashed,
          });
          await userData.save();
          res.send({ success: "Signup success" });
        } catch (error) {
          res.send({ err: "Signup failed" });
        }
      }
    });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }); // taking user from DB
  const increpted = user.password;
  // If stored password and current password are the same result will be true other wise false

  bcrypt.compare(password, increpted, (err, result) => {
    if (result) {
      let token = jwt.sign({ email }, process.env.SCRET_KEY); // creating unique token for user
      res.send({ token: token });
    } else {
      res.send({ err: "Invalid email or password" });
    }
  });
});
module.exports = { userRoute };

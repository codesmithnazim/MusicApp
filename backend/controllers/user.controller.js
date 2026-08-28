import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.model.js";
import logger from "../utils/logger.js";
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { body } = req;
    body.password = await bcrypt.hash(body.password, 10);
    const newUser = await User.create(body);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  // console.log("the body ", body, "the email ", email)
  try {
    const user = req.body;
    const { email } = user;
    const { id } = user;
    const userRecord = await User.findOne({ email });

    // No matching account
    if (!userRecord) {
      res.status(404).json({ error: "Email not found, please sign up first" });
      return;
    }
    const password =await bcrypt.compare(user.password, userRecord.password);
    logger.info("is password true ", password)
    //Wrong assword
    if (!password) {
      res.status(400).json({ error: "wrong password, try again" });
      return;
    }
    // jwt.sign({ email, id }, "that's a secrret, don't share with any body");

    res
      .status(200)
      .cookie(
        "musicWebAppToken",
        jwt.sign({ email, id }, "that's a secrret, don't share with any body"),
        { secure: true },
      )
      .json({success: true, redirectTo:"/"})
  } catch (error) {
    next(error);
  }
});

export { usersRouter };

import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/Users.model.js";
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



export {usersRouter}
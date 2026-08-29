import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;

    if (body.password.length < 6) {
      res.status(404).json({ error: "password must be 6 characters long" });
      return;
    }

    body.password = await bcrypt.hash(body.password, 10);
    const newUser = await User.create(body);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const logInUser = async (req, res, next) => {
  // console.log("the body ", body, "the email ", email)
  try {
    const credentials = req.body;
    let { email } = credentials;
    const userRecord = await User.findOne({ email });

    // No matching account
    if (!userRecord) {
      res.status(404).json({ error: "Email not found, please sign up first" });
      return;
    }
    const password = await bcrypt.compare(
      credentials.password,
      userRecord.password,
    );
    logger.info("is password true ", password);
    //Wrong assword
    if (!password) {
      res.status(401).json({ error: "wrong password, try again" });
      return;
    }
    // jwt.sign({ email, id }, "that's a secrret, don't share with any body");
    email = userRecord.email;
    const id = userRecord._id;
    res
      .status(200)
      .cookie(
        "musicWebAppToken",
        jwt.sign({ email, id }, "that's a secrret, don't share with any body"),
        { secure: false },
      )
      .json({ success: true, redirectTo: "/" ,user: userRecord});
  } catch (error) {
    next(error);
  }
};

// User profile
const myProfile = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      logger.error("user not exist");
      return res.status(401).json({ error: "your credentials are wrong" });
    }
    return res.status(200).json({user , success: true});
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, registerUser, logInUser, myProfile };

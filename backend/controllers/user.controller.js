import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { Upload } from "@aws-sdk/lib-storage";
import b2Client from "../config/b2Client.js";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";
import config from "../utils/config.js";
import mongoose from "mongoose";
import getSignedFileUrl from "../utils/b2SignedUrl.js";

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
    // let fileURL = new String();
    const _id = new mongoose.Types.ObjectId();
    let key = "";
    const { body: user } = req; // Variable aliasing body-----> user

    if (user.password.length < 6) {
      res.status(404).json({ error: "password must be 6 characters long" });
      return;
    }
    logger.info("the request object = ", req.file);
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      logger.info(
        "the extension generated for the profile picture of this user ",
        fileExtension,
      );
      key = `avators/${_id}-${Date.now()}${fileExtension}`;
      logger.info(
        "the key generated for the profile picture of this user ",
        key,
      );
      // logger.info("the bucket name = ", config.BUCKET_NAME)
      const upload = new Upload({
        client: b2Client,
        params: {
          Bucket: config.BUCKET_NAME,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        },
      });
      await upload.done();
      // fileURL = `https://${config.BUCKET_NAME}.${config.B2_ENDPOINT}/${key}`;
    }

    // logger.info("the url of the picture going for storing ", fileURL);
    user.password = await bcrypt.hash(user.password, 10);
    user._id = _id;
    user.profilePicture = key;
    const newUser = await User.create(user);
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
    //  Add the avator url generated from the profilePicture attribue present in the userRecord
    if (userRecord.profilePicture) {
      userRecord.profilePicture = await getSignedFileUrl(
        userRecord.profilePicture,
      );
    }

    res
      .status(200)
      .cookie(
        "musicWebAppToken",
        jwt.sign({ email, id }, "that's a secrret, don't share with any body", {
          expiresIn: '30d',
        }),
        { secure: config.NODE_ENV === "PRODUCTION",httpOnly: true, maxAge:30*24*60*60*1000 },
      )
      .json({ success: true, redirectTo: "/", user: userRecord });
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
    return res.status(200).json({ user, success: true });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, registerUser, logInUser, myProfile };

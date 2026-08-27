import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    Type: String,
    requried: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    requried: true,
    trim: true,
    unique: [true, "Email already registered"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    type: String,
    requried: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
   }],
   
});

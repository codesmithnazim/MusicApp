import mongoose from "mongoose";

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    isfeatured: {
      type: Boolean,
      default: false,
    },
    audioUrl: {
      type: String,
      required: true,
    }, // It'll store the key not the url, for further explnation please go to ./user.model.js
    coverUrl: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    plays: {
      type: Number,
      default: 0,
    },
    description:{
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

musicSchema.set("toJSON", {
  transform: (origialDoc, returnDoc) => {
    ((returnDoc.id = returnDoc._id.toString()), delete returnDoc._id);
    delete returnDoc.__v;
  },
});

const Song = mongoose.model("Song", musicSchema);
export { Song };

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
      required: [true, "the artist name is a required field"],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    audioUrl: {
      type: String,
      required: [true, "audioUrl is required"],
    }, // It'll store the key not the url, for further explnation please go to ./user.model.js
    coverUrl: {
      type: String,
      required: [true, "coverUrl is required"],
    },
    genre: {
      type: String,
      trim: true,
    },
    plays: {
      type: Number,
      default: 0,
    },
    likes:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "approved",
    },
    visibility: {
      type: String,
      default: "public",
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

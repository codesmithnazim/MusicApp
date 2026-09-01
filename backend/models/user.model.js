import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Email already registered"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "",
    // It will store the key only. We will have to produce a signed url from the key for the frontend.
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
   }],
   
});

userSchema.set('toJSON',{
  transform:(originalDoc, returnedDoc)=>{
    returnedDoc.id= returnedDoc._id.toString(),
    delete returnedDoc._id,
    delete returnedDoc.__v,
    delete returnedDoc.password
  }
})

const User= mongoose.model("User", userSchema)

export {User}
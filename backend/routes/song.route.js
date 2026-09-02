import express from "express"
// import {getAllUsers, registerUser, logInUser, myProfile} from "../controllers/user.controller.js"
import { tokenValidator } from "../middlewares/validateToken.js"
import { loadUser } from "../middlewares/loadUser.js"
import upload from "../middlewares/upload.js"
const usersRouter= express.Router()


// usersRouter.get("/", getAllUsers)
usersRouter.post("/register",upload.single("profilePic") ,registerUser)
// usersRouter.post("/login", logInUser)
// usersRouter.get("/me",tokenValidator,loadUser, myProfile)

 
export { usersRouter }
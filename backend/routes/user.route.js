import express from "express"
import {getAllUsers, registerUser, logInUser, userProfile} from "../controllers/user.controller.js"
import { tokenValidator } from "../middlewares/validateToken.js"
const usersRouter= express.Router()


usersRouter.get("/", getAllUsers)
usersRouter.post("/register", registerUser)
usersRouter.post("/login", logInUser)
usersRouter.get("/profile",tokenValidator, userProfile)

 
export { usersRouter }
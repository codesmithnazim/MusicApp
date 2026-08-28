
import jwt from "jsonwebtoken"
import logger from "../utils/logger.js"
const tokenValidator=async (req, res, next)=>{
    try {
        const token= req.cookies.musicWebAppToken
        if(!token){
            logger.info("no token with this name ")
            return;
        }
        const user = jwt.verify(token, "that's a secrret, don't share with any body")
        req.user= user
        logger.info("The user information from the tokenvalidator ",user)
        next()
    } catch (error) {
        next(error)
    }
}

export {tokenValidator}
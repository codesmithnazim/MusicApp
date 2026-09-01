
import jwt from "jsonwebtoken"
import logger from "../utils/logger.js"
import config from "../utils/config.js"

const tokenValidator=async (req, res, next)=>{
    try {
        const token= req.cookies.musicWebAppToken
        if(!token){
            logger.info("no token with this name ")
          return  res.status(401).json({"message":"No token"})
        }
        const user = jwt.verify(token,config.JWT_SECRET)
        req.user= user
        logger.info("The user information from the tokenvalidator ",user)
        next()
    } catch (error) {
        next(error)
    }
}

export {tokenValidator}
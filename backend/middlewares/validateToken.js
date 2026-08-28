
import jwt from "jsonwebtoken"
import logger from "../utils/logger"
const tokenValidator=async (req, res, next)=>{
    try {
        const token= req.cookies.musicWebAppToken
        const user = jwt.verify(token, "that's a secrret, don't share with any body")
        logger.info(user)
    } catch (error) {
        next(error)
    }
}

export {tokenValidator}
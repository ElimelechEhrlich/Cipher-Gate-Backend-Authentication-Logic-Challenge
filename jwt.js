import { config } from "dotenv";
import jwt from "jsonwebtoken"
config()

export const createToken = (username, id) => {
    return jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw error
    }
}

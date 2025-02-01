import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"


export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies["jwt-socio"]
        if(!token){
            return res.status(401).json({message:"Unauthorized User"})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:"Unauthorized User"})
        }

        const user = await User.findById(decode.userId).select("-password")
        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        req.user = user

        next()
    }catch(error){
        console.log("Error in ProtectRoute middleware:", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}
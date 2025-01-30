import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req, res) => {
    try{
        const {name, username, email, password} = req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: "Email already exists"})
        }

        const existingUserName = await User.findOne({username});
        if(existingUserName){
            return res.status(400).json({message: "Username already taken"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        // if all the check passed then we hashing the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User ({
            name,
            email,
            password: hashedPassword,
            username
        })

        await user.save()

        // When the user is saved then we generate the token and store it in the cookies

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"3d"})

        res.cookie("jwt-socio", token, {
            httpOnly: true, //prevent XSS attack
            maxAge: 3 * 24 * 60 * 60* 1000,
            sameSite: "strict", //prevent csrf
            secure: process.env.NODE_ENV === 'production', //prevents man in the middle attacks
        })

        res.status(201).json({message: "User registered successfully"});

    }catch(error) {
        console.log("Error in signup:", error.message)
        return res.status(500).json({message:"Internal server Error"})
    }
}

export const login = async(req, res) => {
    try{

        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"3d"})

        res.cookie("jwt-socio", token, {
            httpOnly: true, //prevent XSS attack
            maxAge: 3 * 24 * 60 * 60* 1000,
            sameSite: "strict", //prevent csrf
            secure: process.env.NODE_ENV === 'production', //prevents man in the middle attacks
        })

        res.status(200).json({message: "User logged in successfully"})

    }catch(error){
        console.log("Error in login:", error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}
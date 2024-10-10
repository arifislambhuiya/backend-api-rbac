import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'

const register = async (req,res) =>{

    try {
        const {username, email, password, role} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            role
        })
        
        await newUser.save()
        
        res.status(201).json({message:"User created successfully",newUser})
    
    } catch (error) {
        
        res.status(500).json({message:"Something went worng"})
    }
}

const login = async (req,res) =>{ 

    try {
        const {username,email,password} = req.body
        const user = await User.findOne({
            $or: [{username},{email}]
        })
    
        if(!user){
            return res.status(404).json({message:`User with username or email ${username,email} not found`})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentails'})
        }

        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
           {expiresIn:'1h'}
        )

        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({message:"Something went worng"})
    }
}

 
export {
    register,login
}
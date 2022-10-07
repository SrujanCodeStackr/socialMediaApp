import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Registering a new user
const registerUser = async(req,res)=>{
    // encrypt password with bcrypt
    // const {userName,firstName,lastName,password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password,salt)
    req.body.Password=hashedPass 
    const newUser = new UserModel(req.body)
    const {userName} = req.body

    try{
        const oldUser= await UserModel.findOne({userName})
        if (oldUser) {
            return res.status(400).json("user is already registered")
        }
        const user = await newUser.save()
        const token = jwt.sign({
            userName:user.userName,id : user._id
        },process.env.JWT_KEY,{expiresIn:"1h"})
        res.status(200).json({user,token})
    }
    catch(error){
        res.status(500).json({message:error.message})
    } 
}

// log in user
export const loginUser= async(req,res)=>{
    const {userName,password} = req.body

    try{
        const user = await UserModel.findOne({userName:userName})
        
        if (user) {
            const validity = await bcrypt.compare(password ,user.Password)
            if(!validity){
                res.status(400).json("Wrong Password")
            }else{
                const token = jwt.sign({
                    userName:user.userName,id : user._id
                },process.env.JWT_KEY,{expiresIn:"1h"})
                res.status(200).json({user,token})
            }
        }
        else{
            res.status(404).json("user does not exist")
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
export default registerUser
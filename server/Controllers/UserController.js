import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// get All users 
export const getAllUsers = async(req,res)=>{
    try {
        let users = await UserModel.find();
        users= users.map((user)=>{
            const {password,...otherdetails} = user._doc
            return otherdetails;  
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get a user 
const getUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id)
        if (user) {
            const {password,...otherDeatils} = user._doc;
            res.status(200).json(otherDeatils)
        } else {
            res.status(404).json("user is not existed")
        }
    } catch (error) {
        res.status(500).json(error)
    }
} 
export default getUser

//update a user
export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const {_id,currentuserAdminStatus,password} = req.body;
    if(id === _id){
        try {
            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt)
            }
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true})

            const token = jwt.sign({userName:user.userName,id:user._id},
                process.env.JWT_KEY,{expiresIn:"1h"})

            res.status(200).json({user,token,})
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
            res.status(403).json("Access denied you can only update your own profile")
    }
}

// Delete a User 
export const deleteUser = async (req,res)=>{
    const id = req.params.id
    const {currentUserId,currentuserAdminStatus} = req.body;
    if(currentUserId === id || currentuserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("user deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access denied you can only delete your own profile")
    }
}

// Follow a user 
export const followUser = async(req,res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if (_id === id) {
        res.status(403).json("Action Forbidden");
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if (!followUser.followers.includes(_id)) {

                await followUser.updateOne({$push:{followers:_id}})
                await followingUser.updateOne({$push:{following:id}})
                res.status(200).json("user followed!")

            } else {
                res.status(403).json("user is already followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//unfollow a user
export const unFollowUser = async(req,res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if (_id === id) {
        res.status(403).json("Action Forbidden");
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if (followUser.followers.includes(_id)) {

                await followUser.updateOne({$pull:{followers:_id}})
                await followingUser.updateOne({$pull:{following:id}})
                res.status(200).json("user followed!")
                
            } else {
                res.status(403).json("user is not followed by you")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}
import express  from "express";
import getUser, { deleteUser, followUser, getAllUsers, unFollowUser, updateUser } from 
"../Controllers/UserController.js";
import authMiddleware from "../MiddleWare/Middleware.js";

const router = express.Router()

router.get('/',getAllUsers)

router.get('/:id',getUser )

router.put('/:id',authMiddleware,updateUser)

router.delete('/:id',authMiddleware,deleteUser)

router.put('/:id/follow',authMiddleware,followUser)

router.put('/:id/unfollow',authMiddleware,unFollowUser)

export default router
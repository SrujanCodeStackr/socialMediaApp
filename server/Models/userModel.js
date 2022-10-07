import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        userName : {
            type : String,
            required:true
        },
        Password :{
            type : String,
            required:true
        },
        firstName:{
            type : String,
            required:true
        },
        lastName:{
            type : String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:false
        },
        profilePicture:String,
        coverPicture:String,
        about:String,
        livesIn:String,
        country:String,
        worksAt:String,
        relationship:String,
        followers:[],
        following:[]
    },
    {timestamps:true}
)

const UserModel = mongoose.model("users",UserSchema)
export default UserModel
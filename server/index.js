import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from "./Routes/UploadRoute.js";

const App = express()

// to serve images in public use
App.use(express.static('public'))
App.use('/images',express.static("images"))

// MiddleWare
App.use(bodyParser.json({limit:"30mb" , extended:true}))
App.use(bodyParser.urlencoded({limit:"30mb" , extended:true}))
App.use(cors())

//dotenv config for magoose secure connection
dotenv.config()

mongoose.connect(
    process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>App.listen(process.env.PORT, ()=>console.log(`Listening at ${process.env.PORT}`)))
    .catch((error)=>console.log(error))

//Usage of routes

App.use('/auth' , AuthRoute)
App.use('/user',UserRoute)
App.use('/post',PostRoute)
App.use('/upload',UploadRoute)
    
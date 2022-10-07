import express  from "express";
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename: (req,file,cb) =>{
        console.log(file);
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage})

router.post("/",upload.single("file"),(req,res)=>{
    try {
        console.log("Api called in try block")
        // return res.status(200).json("file Uploaded successfully")
        console.log(req.file) 
        return res.send(req.file)

    } catch (error) {
        console.log("Api called")
        console.log(error)
        return res.status(400).json(error)
    }
})

export default router
import React ,{useState,useRef} from 'react'
import './PostShare.css'
import {UilScenery,UilPlayCircle,UilLocationPoint,UilSchedule,UilTimes} from '@iconscout/react-unicons'
import {useDispatch, useSelector} from 'react-redux'
import uploadPost,{uploadImage} from '../../actions/uploadAction' 

const PostShare = () => {
    const [image , setImage]=useState(null)
    const imageRef = useRef()
    const {user} = useSelector((state)=>state.authReducer.authData)
    const desc = useRef()
    const dispatch = useDispatch()
    const loading = useSelector(state=>state.postReducer.uploading)
    const serverPublic = process.env.React_App_PUBLIC_FOLDER

    const imageChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img)            
        }
    }
    const reset = ()=>{
        setImage(null)
        desc.current.value=null
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
         const newPost = {
            userId:user._id,
            desc : desc.current.value
         }
         if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name",filename)
            data.append("file",image)
            newPost.image=filename 
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
                console.log("step1")
            } catch (error) {
             console.log(error)   
            }
         }
         dispatch(uploadPost(newPost))
         reset()
    }
  return (
    <div className='postShare'>
        <img src={user.profilePicture?serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}  alt='' />
        <div>
            <input type='text' placeholder='Write something here' ref={desc} required />
            <div className='postOptions'>
                <div className='options' style={{color:'var(--photo)'}} 
                onClick={()=>{imageRef.current.click()}}>
                <UilScenery /> 
                Photo
                </div>
                <div className='options' style={{color:'var(--video)'}}><UilPlayCircle />Video</div>
                <div className='options' style={{color:'var(--location)'}}><UilLocationPoint />Location</div>
                <div className='options' style={{color:'var(--schedule)'}}><UilSchedule />Schedule</div>
                <button className='button ps-button' onClick={handleSubmit} disabled={loading}>
                {loading?"Uploading":"Share"}
                </button>
                <div style={{display:'none'}}>
                    <input type='file' name='myImage' ref={imageRef} onChange={imageChange} />
                </div>
            </div>
            {image && (
                <div className='previewImage'>
                     <UilTimes  onClick={() => setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt='' />
                </div>
            )}
        </div>
    </div>
  )
}

export default PostShare
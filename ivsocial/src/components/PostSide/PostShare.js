import React ,{useState,useRef} from 'react'
import profileImg from '../../img/profileImg.jpg'
import './PostShare.css'
import {UilScenery,UilPlayCircle,UilLocationPoint,UilSchedule,UilTimes} from '@iconscout/react-unicons'

const PostShare = () => {
    const [image , setImage]=useState(null)
    const imageRef = useRef()
    const imageChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage({
                image : URL.createObjectURL(img)
            })            
        }
    }
  return (
    <div className='postShare'>
        <img src={profileImg}  alt='' />
        <div>
            <input type='text' placeholder='Write something here' />
            <div className='postOptions'>
                <div className='options' style={{color:'var(--photo)'}} onClick={()=>{imageRef.current.click()}}><UilScenery /> Photo</div>
                <div className='options' style={{color:'var(--video)'}}><UilPlayCircle />Video</div>
                <div className='options' style={{color:'var(--location)'}}><UilLocationPoint />Location</div>
                <div className='options' style={{color:'var(--schedule)'}}><UilSchedule />Schedule</div>
                <button className='button ps-button'>Share</button>
                <div style={{display:'none'}}>
                    <input type='file' name='myImage' ref={imageRef} onChange={imageChange} />
                </div>
            </div>
            {image && (
                <div className='previewImage'>
                     <UilTimes  onClick={() => setImage(null)}/>
                    <img src={image.image} alt=''  />
                </div>
            )}
        </div>
    </div>
  )
}

export default PostShare
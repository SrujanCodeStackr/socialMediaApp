import React, {useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import {updateuser} from '../../actions/userAction';

const ProfileModal = ({modalOpen,setModalOpen,data}) => {
  const theme = useMantineTheme();
  const {password,...other} = data;
  const [formData,setFormData] = useState(other);
  const [profileImage,setProfileImage] = useState();
  const [coverImage,setCoverImage] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const {user} = useSelector((state)=>state.authReducer.authData);

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
    console.log(formData)
  }

  const onImageChange = (event)=>{
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0]
      console.log(image)
      event.target.name==="profilePicture"?setProfileImage(image):setCoverImage(image)
      console.log(profileImage)
      console.log(coverImage)
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    let userData = formData;
    console.log(userData)
    if(profileImage){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name",fileName);
      data.append("file",profileImage);
      userData.profilePicture = fileName;
      console.log("profile",data)
    }
    try {
      dispatch(uploadImage(data))
    } catch (error) {
      console.log(error)
    }
    if(coverImage){
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name",fileName);
      data.append("file",coverImage);
      userData.coverPicture = fileName;
    }
    try {
      dispatch(uploadImage(data))
    } catch (error) {
      console.log(error)
    }
    dispatch(updateuser(params.id,userData))
    console.log(userData)
    setModalOpen(false)
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size = '55%'
      opened = {modalOpen}
      onClose ={()=>setModalOpen(false)}
      >
        <form className='infoForm'>
            <h3>Your Info</h3>
            <div>
                <input  type='text' className='infoInput' name='firstName' 
                placeholder='First Name' onChange={handleChange} value={formData.firstName} />
                <input type='text' className='infoInput' name='lastName' 
                placeholder='Last Name' onChange={handleChange} value={formData.lastName} />
            </div>
            <div>
                <input type='text' className='infoInput' name='worksAt' 
                placeholder='Work Location' onChange={handleChange} value={formData.worksAt} />
            </div>
            <div>
                <input type='text' className='infoInput' name='livesIn' 
                placeholder='Lives In' onChange={handleChange} value={formData.livesIn} />
                <input type='text' className='infoInput' name='country' 
                placeholder='Country' onChange={handleChange} value={formData.country} />
            </div>
            <div>
            <input type='text' className='infoInput' name='relationship' placeholder='Relationship Status' onChange={handleChange} 
            value={formData.relationship} />
            </div>
            <div>
                profilePicture
                <input type='file' name="profilePicture" onChange={onImageChange} />
                cover Image
                <input type='file' name="coverPicture" onChange={onImageChange} />
            </div>
            <button className='button infoButton' onClick={handleSubmit}>Update</button>
        </form>
    </Modal>
  );
}
export default ProfileModal
import React from 'react'
import { useSelector } from 'react-redux'
import './ProfileCard.css'
import {Link} from 'react-router-dom'
const ProfileCard = ({location}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const posts = useSelector((state)=>state.postReducer.posts)
    const serverPublic = process.env.React_App_PUBLIC_FOLDER
  return (
    <div className='ProfileCard'>
        <div className='ProfileImages'>
            <img src={user.coverPicture?serverPublic + user.coverPicture : serverPublic + "infovisionSocial.png"} alt='' />
            <img src={user.profilePicture?serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt='' />
        </div>
        <div className='ProfileName'>
            <span>{user.firstName} {user.lastName}</span>
            <span>{user.worksAt?user.worksAt:"Write about yourself"}</span>
        </div>
        <div className='followStatus'>
            <hr />
            <div>
                <div className='follow'>
                    <span>{user.following.length}</span>
                    <span>following</span>
                </div>
                <div className='vl'></div>
                <div className='follow'>
                    <span>{user.followers.length}</span>
                    <span>followers</span>
                </div>
                {location === "profilePage" && (
                    <>
                        <div className='vl'></div>
                        <div className='follow'>
                            <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr/>
        </div>
        {location === "profilePage" ? '' :
            <span> 
            <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}>
                My Profile
            </Link>
            </span>} 
    </div>
  )
}
export default ProfileCard
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/userAction';

const User = ({person}) => {
    const serverPublic = process.env.React_App_PUBLIC_FOLDER
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.authReducer.authData)
    const [following,setFollowing] = useState(person.followers.includes(user._id))
    const handleFollow=()=>{
        following?
        dispatch(unFollowUser(person._id,user)):
        dispatch(followUser(person._id,user))
        setFollowing((prev)=>!prev)
    }
  return (
    <div className='follower' key={person.id}>
        <div>
            <img src={person.profilePicture?serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"} className='followerImg' alt='' />
            <div className='name'>
                <span>{person.firstName}</span>
                <span>{person.userName}</span>
            </div>
        </div>
        <button className={following?'button fc-button unFollowButton':'button fc-button'} onClick={handleFollow}>{following?"unfollow":"follow"}</button>
    </div>
  )
}

export default User
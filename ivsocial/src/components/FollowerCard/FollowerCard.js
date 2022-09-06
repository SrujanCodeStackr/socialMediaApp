import React from 'react'
import { Followers } from '../../Data/FollowersData'
import './FollowerCard.css'

const FollowerCard = () => {
  return (
    <div className='followerCard'>
        <h3>Who is following you</h3>
        {Followers.map((follower)=>{
            return(
                <div className='follower' key={follower.id}>
                    <div>
                        <img src={follower.img} alt='' className='followerImg'/>
                        <div className='name'>
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className='button fc-button'>follow</button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowerCard
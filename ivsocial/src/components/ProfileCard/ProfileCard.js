import React from 'react'
import cover from '../../img/cover.jpg'
import srujan01 from '../../img/srujan01.jpg'
import './ProfileCard.css'
const ProfileCard = () => {
    const profilePage = true
  return (
    <div className='ProfileCard'>
        <div className='ProfileImages'>
            <img src={cover} alt='' />
            <img src={srujan01} alt='' />
        </div>
        <div className='ProfileName'>
            <span>Srujan Gundala</span>
            <span>Senior UI/UX Developer</span>
        </div>
        <div className='followStatus'>
            <hr />
            <div>
                <div className='follow'>
                    <span>6980</span>
                    <span>followings</span>
                </div>
                <div className='vl'></div>
                <div className='follow'>
                    <span>12</span>
                    <span>followers</span>
                </div>
                {profilePage && (
                    <>
                        <div className='vl'></div>
                        <div className='follow'>
                            <span>3</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr/>
        </div>
        {profilePage ? '' :<span> My Profile</span>} 
    </div>
  )
}
export default ProfileCard
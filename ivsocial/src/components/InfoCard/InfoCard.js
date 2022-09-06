import React, { useState } from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'

const InfoCard = () => {
    const [modalOpen,setModalOpen] = useState(false)
  return (
    <div className='infoCard'>
        <div className='infoHead'>
            <h4>Your Info</h4>
            <div>
                <UilPen width='2rem' height='1.2rem' onClick={()=>setModalOpen(true)} />
                <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
        </div>
        <div className='info'>
            <span><b>Status</b></span>
            <span> in Relationship</span>
        </div>
        <div className='info'>
            <span><b>Lives</b></span>
            <span> in Bangalore,India</span>
        </div>
        <div className='info'>
            <span><b>Works at</b></span>
            <span> Infoviosion Labs pvt ltd.</span>
        </div>
        <button className='button logOut-button'>Log Out</button>
    </div>
  )
}

export default InfoCard 
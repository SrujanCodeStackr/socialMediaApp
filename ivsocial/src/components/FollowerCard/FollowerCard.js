import React, { useEffect, useState } from 'react'
import User from '../User/User'
import './FollowerCard.css'
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../api/UserRequest';


const FollowerCard = () => {
    const [persons,setPersons] = useState([])
    const {user} = useSelector((state)=>state.authReducer.authData);

    useEffect(()=>{
        const fetchpersons = async ()=>{
            const { data} = await getAllUsers();
            setPersons(data)
            console.log(data)
        }
        fetchpersons()
    },[])
  return (
    <div className='followerCard'>
        <h3>People you may Know</h3>
        {persons.map((person,id)=>{
            if (person._id!==user._id) {
                return(<User person={person} key={id} />)
            }
        })}
    </div>
  )
}

export default FollowerCard
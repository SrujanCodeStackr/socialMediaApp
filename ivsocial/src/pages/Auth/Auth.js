import React, { useState } from 'react'
import './Auth.css'
import IvSocial from '../../img/IvSocial.jpg' 
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
    const [isSignUp,setIsSignUp] = useState(true);
    
    const [data , setData] = useState({firstName:"",lastName:"",userName:"",password:"",confirmPassword:""})

    const [confirmPass,setConfirmPass]=useState(true)

    const dispatch = useDispatch()

    const loading = useSelector((state)=>state.authReducer.loading)

    console.log(loading)

    const handleChange = (e)=>{
        setData({...data ,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (isSignUp) {
            data.password === data.confirmPassword ?
             dispatch(signUp(data)) : setConfirmPass(false)
        }else{
            dispatch(logIn(data))
        }
    }

    const resetForm = ()=>{
        setConfirmPass(true)
        setData({firstName:"",lastName:"",userName:"",password:"",confirmPassword:""})

    }
  return (
    <div className='auth'>
        {/* left side */}
        <div className='a-left'>
            <img src={IvSocial} alt='' />
            <div className='webName'>
                <h1>Infovision Social</h1>
                <h6>Innovation | Strategy | Insights | Transformation</h6>
            </div>
        </div>
        {/* right side  */}
        <div className='a-right'>
            <form className='infoForm authForm' onSubmit={handleSubmit}>
                <h3>{isSignUp? "Sign Up" : "Log In"}</h3>
                {isSignUp && <div>
                    <input type='text' placeholder='First Name' className='infoInput' name='firstName' onChange={handleChange} value={data.firstName} />
                    <input type='text' placeholder='Last Name' className='infoInput' name='lastName' onChange={handleChange} value={data.lastName} />
                </div>}
                <div>
                    <input type='text' placeholder='User Name' className='infoInput' name='userName' onChange={handleChange} value={data.userName} />
                </div>
                <div>
                    <input type='password' placeholder='Password' className='infoInput' name='password'  onChange={handleChange} value={data.password} />
                    { isSignUp && <input type='password' placeholder=' Confirm Password' className='infoInput' name='confirmPassword' onChange={handleChange} 
                    value={data.confirmPassword} />}
                </div>
                <span style={{display:confirmPass?"none":"block",color:"red",fontSize:"12px",alignSelf:"flex-end",margin:"5px"}}>
                    * Confim Password is wrong                                                                   
                </span>
                <div>
                    <span style={{fontSize:'12px' , cursor : "pointer"}} 
                    onClick={()=>{setIsSignUp(prev=>!prev); resetForm()}}> 
                        {isSignUp ? "Already have an account! Log In" : "Don't have an Account! SignUp"}
                    </span>
                </div>
                <button type='submit' className='button infoButton' disabled={loading}>
                    {loading?"Loading...":isSignUp ? "Sign Up" : "Log In"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Auth


import React from 'react'
import './Auth.css'
import IvSocial from '../../img/IvSocial.jpg' 

const Auth = () => {
  return (
    <div className='auth'>
        <div className='a-left'>
            <img src={IvSocial} alt='' />
            <div className='webName'>
                <h1>Infovision Social</h1>
                <h6>Innovation | Strategy | Insights | Transformation</h6>
            </div>
            {/* <SignUp /> */}
            <Login/>
        </div>
    </div>
  )
}

const Login = () =>{
    return(
        <div className='a-right'>
            <form className='infoForm authForm'>
                <h3>Log In</h3>
                <div>
                    <input type='text' placeholder='User Name' className='infoInput' name='userName' />
                </div>
                <div>
                    <input type='password' placeholder='Password' className='infoInput' name='password' />
                </div>
                <div>
                    <span style={{fontSize:'12px'}}>Don't have an Account! SignUp</span>
                    <button type='submit' className='button infoButton'>Log In</button>
                </div>
            </form>
        </div>
    )
}

const SignUp = () =>{
    return(
        <div className='a-right'>
            <form className='infoForm authForm'>
                <h3>Sign Up</h3>
                <div>
                    <input type='text' placeholder='First Name' className='infoInput' name='firstName' />
                    <input type='text' placeholder='Last Name' className='infoInput' name='lastName' />
                </div>
                <div>
                <input type='text' placeholder='User Name' className='infoInput' name='userName' />
                </div>
                <div>
                    <input type='password' placeholder='Password' className='infoInput' name='password' />
                    <input type='password' placeholder=' Confirm Password' className='infoInput' name='confirmPassword' />
                </div>
                <div>
                    <span style={{fontSize:'12px'}}> Already have an account! Log In</span>
                </div>
                <button type='submit' className='button infoButton'>Sign Up</button>
            </form>
        </div>
    )    
}
export default Auth
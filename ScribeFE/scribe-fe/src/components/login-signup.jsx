import React, { useState } from 'react';
import "../styles/LoginSignup.css"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"

const LoginSignup = () => {
    const [action,setAction] = useState("Sign up");
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src={email_icon} alt=''/>
                        <input type='email' name="userid" placeholder='Email Id'/>
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt=''/>
                        <input type='password' name="password" placeholder='Password'/>
                    </div>
                </div>
                <div className='submit-container'>
                    <input type = "submit" value="sign up" id='button' className={action === "Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}/> 
                    <div id='button' className={action === "Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </form>
    );
}

export default LoginSignup;
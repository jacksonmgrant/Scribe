import React from 'react';
import "../styles/LoginSignup.css"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import { Outlet, Link } from "react-router-dom";

const LoginSignup = () => {
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Login</div>
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
                    <Link className="submit"to="/">Login</Link>
                    <Link className="submit"to="/SignupPage">Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginSignup;
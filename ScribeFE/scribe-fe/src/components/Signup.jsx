import React from 'react';
import "../styles/LoginSignup.css"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import { Outlet, Link } from "react-router-dom";
import person_icon from "./Assets/person.png"

const Signup = () => {
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Sign up</div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src = {person_icon} alt=''/>
                        <input type='text' name="Name" placeholder='Name'/>
                    </div>
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
                    <Link className="submit"to="/">Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default Signup;
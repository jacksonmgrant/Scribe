import React from 'react';
import "../styles/LoginSignup.css";
import { Link } from 'react-router-dom';

const Signup = ({signin}) => {
    return(
        <form method='POST'>
            <div className='container'>
                <div className='header'>
                    <h1 className='text'>Sign up</h1>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <i className="fa-solid fa-user"></i>
                        <input type='text' name="Name" placeholder='Name'/>
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-envelope"></i>
                        <input type='email' name="userid" placeholder='Email'/>
                    </div>
                    <div className='input'>
                    <i className="fa-solid fa-lock"></i>
                        <input type='password' name="password" placeholder='Password'/>
                    </div>
                </div>
                <div className='submit-container'>
                    <Link className="submit" to="/" onClick={() => signin()}>Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default Signup;
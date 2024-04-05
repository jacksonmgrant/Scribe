import React from 'react';
import "../styles/LoginSignup.css"
import { Link } from 'react-router-dom';

const LoginSignup = ({signin}) => {
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <h1 className='text'>Log In</h1>
                </div>
                <div className='inputs'>
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
                    <Link className="submit" to="/" 
                        onClick={() => 
                            signin()
                        }>Log In</Link>
                </div>
                <div className='signup-container'>
                        <p>Don't have an account?</p>
                        <Link className="signup" to="/SignupPage">Sign up today!</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginSignup;
import React from 'react';
import "../styles/LoginSignup.css"

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
                    <button className="submit" href="/" 
                        onClick={() => 
                            signin()
                        }>Log In</button>
                </div>
                <div className='signup-container'>
                        <p>Don't have an account?</p>
                        <a className="signup" href="/SignupPage">Sign up today!</a>
                </div>
            </div>
        </form>
    );
}

export default LoginSignup;
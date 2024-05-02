import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import {Link,useNavigate} from 'react-router-dom';
import apiService from '../services/apiService';

const LoginSignup = ({signin,signout,email,setEmail,password,setPassword,clearLoginInput}) => {
    const [emailEmpty, setEmailEmpty] = useState(true);
    const [passwordEmpty, setPasswordEmpty] = useState(true);

    const [cannotLogin, setCannotLogin] = useState(true);
    const navigate = useNavigate();

    function handleEmailInput(event) {
        setEmail(event.target.value);
        setEmailEmpty(false);
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value);
        setPasswordEmpty(false);
    }
    
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <h1 className='text'>Log In</h1>
                </div>
                <div className='inputs'>
                    <label className="login-signup-label" htmlFor='email'>Email</label>
                    <div className='input'>
                        <i className="fa-solid fa-envelope"></i>
                        <input autoFocus
                        id='email'
                        type='email' 
                        name="userid" 
                        required
                        onChange={(event) => handleEmailInput(event)}
                        />
                    </div>
                    {emailEmpty && <p id="emailMsg" style={{ color: 'var(--danger)', display: 'none' }}>Email cannot be blank</p>}
                    <label className="login-signup-label" htmlFor='password'>Password</label>
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input id='password'
                        type='password' 
                        name="password" 
                        required
                        onChange={(event) => handlePasswordInput(event)}
                        />
                    </div>
                    {passwordEmpty && <p id="passwordMsg" style={{ color: 'var(--danger)', display: 'none' }}>Password cannot be blank</p>}
                    {cannotLogin && <p id="cannotLogin" style={{ color: 'var(--danger)', display: 'none' }}>Incorrect email or password</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit"
                        onClick={async () => {
                            await apiService.checkUser(email,password,navigate,setCannotLogin,signin,signout,emailEmpty,passwordEmpty)
                            clearLoginInput()
                        }}
                    >Log in
                    </Link>
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


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
        console.log(email);
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value);
        setPasswordEmpty(false);
        console.log(password);
    }
    
    return(
        <form method='GET' id="form">
            <div className='container'>
                <div className='header'>
                    <h1 className='text'>Log In</h1>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <i className="fa-solid fa-envelope"></i>
                        <input autoFocus
                        type='email' 
                        name="userid" 
                        placeholder='Email'
                        required
                        onChange={(event) => handleEmailInput(event)}
                        />
                    </div>
                    {emailEmpty && <p id="emailMsg" style={{ color: 'var(--danger)', display: 'none' }}>Email cannot be blank</p>}
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input type='password' 
                        name="password" 
                        placeholder='Password'
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
                            console.log(email);
                            console.log(password);
                            await apiService.checkUser(email,password,navigate,signin,signout,setCannotLogin,clearLoginInput,emailEmpty,passwordEmpty)
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


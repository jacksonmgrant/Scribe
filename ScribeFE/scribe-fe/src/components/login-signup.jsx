import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import {Link,useNavigate} from 'react-router-dom';
import apiService from '../services/apiService';

const LoginSignup = ({signin,signout,email,setEmail,password,setPassword}) => {
    const [emailEmpty, setEmailEmpty] = useState(true);
    const [passwordEmpty, setPasswordEmpty] = useState(true);
    
    const [cannotLogin,setCannotLogin] = useState(false);
    const navigate = useNavigate();

    function clearLoginInput() {
        document.getElementsByTagName('input').value = '';
    }

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
                    {cannotLogin && <p id="errMsg" style={{ color: 'var(--danger)', display: 'none' }}>Incorrect email or password</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit" 
                        onClick={async () => {
                            if (emailEmpty) {
                                document.getElementById('emailMsg').style.display = 'block';
                            }
                            if (passwordEmpty) {
                                document.getElementById('passwordMsg').style.display = 'block';
                            }
                            else if (cannotLogin) {
                                document.getElementById('errMsg').style.display = 'block';
                            }
                            await apiService.checkUser(email,password,setCannotLogin,navigate,signin,signout)
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


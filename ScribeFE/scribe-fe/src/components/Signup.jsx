import React, {useState} from 'react';
import "../styles/LoginSignup.css";
import { Link,useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Signup = ({signin,signout,name,setName,email,setEmail,password,setPassword,clearSignupInput}) => {
    const [nameEmpty, setNameEmpty] = useState(true);
    const [emailEmpty, setEmailEmpty] = useState(true);
    const [passwordEmpty, setPasswordEmpty] = useState(true);
   
    const [cannotSignup,setCannotSignup] = useState(true)
    const navigate = useNavigate();

    function handleNameInput(event) {
        setName(event.target.value);
        setNameEmpty(false);
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
        <form method='POST'>
            <div className='container'>
                <div className='header'>
                    <h1 className='text'>Sign up</h1>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <i className="fa-solid fa-user"></i>
                        <input autoFocus type='text' placeholder='Name' 
                            value={name}
                            required 
                            onChange={(event) => handleNameInput(event)}
                        />
                    </div>
                    {nameEmpty && <p id="nameMsg" style={{ color: 'var(--danger)', display: 'none' }}>Name cannot be blank</p>}
                    <div className='input'>
                        <i className="fa-solid fa-user"></i>
                        <input type='email'  placeholder='Email' 
                            value={email}
                            required
                            onChange={(event) => handleEmailInput(event)}
                        />
                    </div>
                    {emailEmpty && <p id="emailMsg" style={{ color: 'var(--danger)', display: 'none' }}>Email cannot be blank</p>}
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input type='password' 
                            placeholder='Password' 
                            value={password}
                            required
                            onChange={(event) => handlePasswordInput(event)}
                        />
                    </div>
                    {passwordEmpty && <p id="passwordMsg" style={{ color: 'var(--danger)', display: 'none' }}>Password cannot be blank</p>}
                    {cannotSignup && <p id="cannotSignup" style={{ color: 'var(--danger)', display: 'none' }}>An account with that email already exists</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit" 
                    onClick={async () => {
                        await apiService.createUser(name,email,password,navigate,setCannotSignup,signin,signout,clearSignupInput,nameEmpty,emailEmpty,passwordEmpty);
                    }}>
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    );

}

export default Signup;
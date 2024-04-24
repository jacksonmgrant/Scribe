import React, {useState} from 'react';
import "../styles/LoginSignup.css";
import { Link,useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Signup = ({signin,signout,name,setName,email,setEmail,password,setPassword,clearSignupInput}) => {
    const [cannotSignup,setCannotSignup] = useState(false)
    const navigate = useNavigate();

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
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-user"></i>
                        <input type='email'  placeholder='Email' 
                            value={email}
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input type='password' 
                            placeholder='Password' 
                            value={password}
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {cannotSignup && <p style={{ color: 'var(--danger)' }}>An account with this email already exists</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit" 
                    onClick={async () => {
                        await apiService.createUser(name,email,password,navigate,setCannotSignup,signin,signout);
                        clearSignupInput()
                    }}>
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    );

}

export default Signup;
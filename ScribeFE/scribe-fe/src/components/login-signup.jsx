import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import { Link } from "react-router-dom";

const LoginSignup = ({signin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const login = async () => {
        try {
            const response = await fetch(`http://localhost:8000/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emai: email,
                    password: password
                }),
            });
            const result_1 = await response.json();
            console.log('Success:', result_1);
            return result_1;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Login</div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src={email_icon} alt=''/>
                        <input type='email' 
                        name="userid" 
                        placeholder='Email Id'
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt=''/>
                        <input type='password' 
                        name="password" 
                        placeholder='Password'
                        onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </div>
                <div className='submit-container'>
                    <Link className="submit"to="/" 
                        onClick={() => {
                            login()
                            signin()
                        }}
                    >Login
                    </Link>
                    <Link className="submit"to="/SignupPage">Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginSignup;
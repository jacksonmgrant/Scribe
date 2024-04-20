import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import {Link,useNavigate} from 'react-router-dom';


const LoginSignup = ({signin,signout,email,setEmail,password,setPassword,clearLoginInput}) => {

    const [cannotLogin,setCannotLogin] = useState(false);
    const navigate = useNavigate();

    const checkUser = async () => {
        try {
            const response = await fetch(`/users/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const user = await response.json();
            console.log("1 ",user);
            if(user.detail === "Incorrect email or password, or user does not exist."){
                console.log(user.detail);
                setCannotLogin(true);
                signout();
            }else if(user){
                await localStorage.setItem('token', user.access_token);
                navigate('/userpage');
                signin();
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
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
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input type='password' 
                        name="password" 
                        placeholder='Password'
                        required
                        onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {cannotLogin && <p style={{ color: 'var(--danger)' }}>Incorrect email or password</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit" 
                        onClick={async () => {
                            await checkUser()
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


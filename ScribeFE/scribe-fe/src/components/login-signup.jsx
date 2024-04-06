import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import {Link,useNavigate} from 'react-router-dom';


const LoginSignup = ({signin,signout}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setlogin] = useState(false);
    const [cannotLogin,setCannotLogin] = useState(false);
    const navigate = useNavigate();
    
    const checkUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const user = await response.json();
            console.log(user)
            console.log(user.detail)
            // if(user){
            //     setlogin(true)
            //     navigate('/userpage')
            //     signin()
            // }
            if(user.detail === "Email or password is not correct"){
                console.log("yes")
                setlogin(false)
                setCannotLogin(true)
                signout()
            }else if(user){
                setlogin(true)
                navigate('/userpage')
                signin()                
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
                        <input type='email' 
                        name="userid" 
                        placeholder='Email Id'
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input type='password' 
                        name="password" 
                        placeholder='Password'
                        onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {cannotLogin && <p style={{ color: 'red' }}>Wrong Email Id or password</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit" 
                        onClick={async () => {
                            await checkUser()
                        }}
                    >Login
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

// to={canLogin}
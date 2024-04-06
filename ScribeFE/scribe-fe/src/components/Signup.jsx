import React, {useState} from 'react';
import "../styles/LoginSignup.css";
import { Link,useNavigate } from 'react-router-dom';

const Signup = ({signin,signout}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, setSignup] = useState(false);
    const [cannotSignup,setCannotSignup] = useState(false)
    const navigate = useNavigate();

    const createUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            });
            const user = await response.json();
            if(user.msg === "successfully add new user"){
                setSignup(true)
                navigate('/userpage')
                signin()
            }else {
                setCannotSignup(true)
                setSignup(false)
                signout()
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // const canSignup = signup === true ? '/userpage' : '/SignupPage';

    return(
        <form method='POST'>
            <div className='container'>
                <div className='header'>
                    <h1 className='text'>Sign up</h1>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <i className="fa-solid fa-user"></i>
                        <input type='text' placeholder='Name' 
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-user"></i>
                        <input type='email'  placeholder='Email' 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <i className="fa-solid fa-lock"></i>
                        <input type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {cannotSignup && <p style={{ color: 'red' }}>Someone already use this Email</p>}
                </div>
                <div className='submit-container'>
                    <Link className="submit" 
                    onClick={async () => {
                        await createUser();
                    }}>
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default Signup;
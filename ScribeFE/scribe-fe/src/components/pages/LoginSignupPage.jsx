import LoginSignup from "../login-signup";
import "../../styles/LoginSignupPage.css"

const LoginSignupPage = ({isSignin,signin,signout,email,setEmail,password,setPassword,clearLoginInput}) =>{
    return(
        <div>
            <LoginSignup
            isSignin={isSignin} 
            signin={signin}
            signout={signout}
            email={email}
            setEmail={setEmail}
            password ={password}
            setPassword={setPassword}
            clearLoginInput={clearLoginInput}
            />
        </div>
    )
}

export default LoginSignupPage;
import LoginSignup from "../login-signup";
import "../../styles/LoginSignupPage.css"

const LoginSignupPage = ({signin,signout,email,setEmail,password,setPassword,clearLoginInput}) =>{
    return(
        <div>
            <LoginSignup
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
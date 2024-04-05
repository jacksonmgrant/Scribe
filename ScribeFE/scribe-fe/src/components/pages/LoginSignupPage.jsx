import LoginSignup from "../login-signup";
import "../../styles/LoginSignupPage.css"

const LoginSignupPage = ({signin,signout}) =>{
    return(
        <div>
            <LoginSignup 
            signin={signin}
            signout={signout}
            />
        </div>
    )
}

export default LoginSignupPage;
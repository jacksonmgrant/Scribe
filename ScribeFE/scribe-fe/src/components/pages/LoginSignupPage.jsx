import LoginSignup from "../login-signup";
import "../../styles/LoginSignupPage.css"

const LoginSignupPage = ({signin}) =>{
    return(
        <div>
            <LoginSignup signin={signin}/>
        </div>
    )
}

export default LoginSignupPage;
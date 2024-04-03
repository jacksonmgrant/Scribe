import Signup from "../Signup.jsx";
import "../../styles/LoginSignupPage.css"

const SignupPage = ({signin,signout}) =>{
    return(
        <div>
            <Signup
            signin={signin}
            signout={signout}
            />
        </div>
    )
}

export default SignupPage;
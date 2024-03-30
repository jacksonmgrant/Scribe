import Signup from "../Signup.jsx";
import "../../styles/LoginSignupPage.css"

const SignupPage = ({signin}) =>{
    return(
        <div>
            <Signup
            signin={signin}/>
        </div>
    )
}

export default SignupPage;
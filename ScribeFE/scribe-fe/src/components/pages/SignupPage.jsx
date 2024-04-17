import Signup from "../Signup.jsx";
import "../../styles/LoginSignupPage.css"

const SignupPage = ({isSignin,signin,signout,name,setName,email,setEmail,password,setPassword,clearSignupInput}) =>{
    return(
        <div>
            <Signup
            isSignin={isSignin}
            signin={signin}
            signout={signout}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password ={password}
            setPassword={setPassword}
            clearSignupInput={clearSignupInput}
            />
        </div>
    )
}

export default SignupPage;
import { Outlet, Link } from "react-router-dom";
import "./styles/layout.css"


const Layout = ({isSignin,signout}) => {

    return (
      <>
        <nav>
          <div className='zone pinkblue'>
              <div className='main-nav'>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/aboutus">About us</Link>
                  </li>
                  { isSignin === false
                  ?( 
                    <li class="push">
                        <Link to="/loginSignupPage">Sign up/Login</Link>
                    </li>
                    )
                  : (
                    <li class="push">
                        <Link to="/loginSignupPage"  onClick={signout}>Sign out</Link>
                    </li>
                    )
                  }
              </div>
          </div>
        </nav>
        <Outlet />
      </>
    )
  };

  export default Layout;
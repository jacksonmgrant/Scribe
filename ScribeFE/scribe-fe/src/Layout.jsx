import { Outlet } from "react-router-dom";
import Logo from "./components/Assets/logo-bw.png";
import "./styles/layout.css";


const Layout = ({isSignin,signout}) => {

    return (
      <>
        <nav>
          <div className='zone orange'>
              <div className='main-nav'>
                  <li>
                    <div style={{ display: 'flex', alignItems:  'start' }}>
                      <img alt="Scribe Logo" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                      <a href="/" style={{ fontWeight: '700' }}>Scribe</a>
                    </div>
                  </li>
                  <li>
                      <a id="aboutus" href="/aboutus">About us</a>
                  </li>
                  <li>
                      <a id="formsubmission" href="/formsubmission">Form submission</a>
                  </li>
                  { isSignin === false
                  ?( 
                    <li className="push">
                        <a id="loginSignupPage" href="/loginSignupPage">Log In
                        <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                        </a>
                    </li>
                    )
                  : (
                    <li className="push">
                        <a href="/loginSignupPage"  onClick={signout}>Log out</a>
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
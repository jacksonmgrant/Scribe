import { Outlet, Link } from "react-router-dom";
import Logo from "./components/Assets/logo-bw.png";
import "./styles/layout.css";

const Layout = ({isSignin,signout}) => {

    return (
      <>
        <nav>
          <div>
            { isSignin === false
            ?(
              <div className='zone orange'>
                <div className='main-nav'>
                  <li>
                    <div style={{ display: 'flex', alignItems:  'start' }}>
                      <img alt="Scribe Logo" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                      <Link to="/" style={{ fontWeight: '700' }}>Scribe</Link>
                    </div>
                  </li>
                  <li className="push">
                      <Link to="/loginSignupPage">Log In
                      <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                      </Link>
                  </li>
                </div>
              </div>
              ) 
            : (
              <div className='zone orange'>
                <div className='main-nav'>
                  <li>
                    <div style={{ display: 'flex', alignItems:  'start' }}>
                      <img alt="Scribe Logo" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                      <Link to="/userpage" style={{ fontWeight: '700' }}>Scribe</Link>
                    </div>
                  </li>
                  <li>
                      <Link id="aboutus" to="/aboutus">About us</Link>
                  </li>
                  <li>
                      <Link id="formsubmission" to="/formsubmission">Form submission</Link>
                  </li>
                  <li className="push">
                      <Link to="/loginSignupPage"  onClick={signout}>Log out</Link>
                      <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                  </li>
                </div>
              </div>
              )
            }
          </div>
        </nav>
        <Outlet />
      </>
    )
  };

  export default Layout;
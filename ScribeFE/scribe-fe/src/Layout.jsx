import { Outlet, Link } from "react-router-dom";
import "./styles/layout.css"


const Layout = ({isSignin,signout}) => {

    return (
      <>
        <nav>
          <div className='zone orange'>
              <div className='main-nav'>
                  <li>
                    <div style={{ display: 'flex', alignItems:  'center' }}>
                      <img title="Scribe Logo" src="/logo512.png" style={{ height: '3rem' }}></img>
                      <Link to="/">
                          <h1>Scribe</h1>
                      </Link>
                    </div>
                  </li>
                  <li>
                      <Link to="/aboutus">About us</Link>
                  </li>
                  <li>
                      <Link to="/formsubmission">Form submission</Link>
                  </li>
                  { isSignin === false
                  ?( 
                    <li class="push">
                        <Link to="/loginSignupPage">Sign up/Login
                        <i class="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                        </Link>
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
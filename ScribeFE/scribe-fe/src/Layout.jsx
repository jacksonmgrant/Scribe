import { Outlet, Link } from "react-router-dom";
import Logo from "./components/Assets/logo-bw.png";
import "./styles/layout.css";

const Layout = ({isSignin,signout}) => {

    

    // responsive hamburger menu
    function toggleMenu() {
      var x = document.getElementById("main-nav");
      if (x.className === "main-nav") {
        x.classList.add("responsive");
      }
      else {
        x.classList.remove("responsive");
      }
    }

    function logOut() {
      toggleMenu();
      signout();
    }

    return (
      <div>
        <nav>
          <div>
            { isSignin === false
            ?(
              <div className='main-nav' id="main-nav">
                <ul>
                  <li>
                      <Link className="navlink" to="/" style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                      onClick={toggleMenu}>
                      <img alt="" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                      <span style={{ paddingBottom: '3px' }}>Scribe</span></Link>
                  </li>
                  <li className="push">
                      <Link className="navlink" to="/loginSignupPage" onClick={toggleMenu}>Log In
                      <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                      </Link>
                  </li>
                </ul>
                {/* hamburger icon for small screens */}
                <Link href="javascript:void(0);" className="icon" onClick={toggleMenu}>
                    <i className="fa fa-bars"></i>
                </Link>
              </div>
              ) 
            : (
              <div className='main-nav' id="main-nav">
                <ul>
                  <li>
                      <Link className="navlink" to="/userpage" style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                      onClick={toggleMenu}>
                      <img alt="" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                      <span style={{ paddingBottom: '2px' }}>Scribe</span></Link>
                  </li>
                  <li>
                      <Link className="navlink" to="/aboutus"
                      onClick={toggleMenu}>About us</Link>
                  </li>
                  <li>
                      <Link className="navlink" to="/formsubmission"
                      onClick={toggleMenu}>User feedback</Link>
                  </li>
                  <li className="push">
                      <Link className="navlink" to="/loginSignupPage"  onClick={logOut}>Log out
                      <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                      </Link>
                  </li>
                </ul>
              {/* hamburger icon for small screens */}
                <Link href="javascript:void(0);" className="icon" onClick={toggleMenu}>
                    <i className="fa fa-bars"></i>
                </Link>
              </div>
              )
            }
          </div>
        </nav>
        <Outlet />
      </div>
    )

};

export default Layout;
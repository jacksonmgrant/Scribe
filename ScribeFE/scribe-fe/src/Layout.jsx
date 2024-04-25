import { Outlet, Link } from "react-router-dom";
import Logo from "./components/Assets/logo-bw.png";
import "./styles/layout.css";

// responsive hamburger menu
function collapseMenu() {
    var x = document.getElementById("main-nav");
    if (x.className === "main-nav") {
        x.className += " responsive";
    } else {
        x.className = "main-nav";
    }
}

const Layout = ({isSignin,signout}) => {

    return (
      <div>
        <nav>
          <div>
            { isSignin === false
            ?(
              <div className='main-nav' id="main-nav">
                <ul>
                  <li>
                      <Link to="/" style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                      onClick={collapseMenu}>
                      <img alt="Scribe Logo" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                      <span style={{ paddingBottom: '3px' }}>Scribe</span></Link>
                  </li>
                  <li className="push">
                      <Link to="/loginSignupPage"
                      onClick={collapseMenu}>Log In
                      <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                      </Link>
                  </li>
                </ul>
                {/* hamburger icon for small screens */}
                <Link href="javascript:void(0);" className="icon" onClick={collapseMenu}>
                    <i className="fa fa-bars"></i>
                </Link>
              </div>
              ) 
            : (
              <nav>
                <div className='main-nav' id="main-nav">
                  <ul>
                    <li>
                        <Link to="/userpage" style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                        onClick={collapseMenu}>
                        <img alt="Scribe Logo" src={Logo} style={{ height: '1.75rem', marginRight: '0.5rem' }}></img>
                        <span style={{ paddingBottom: '2px' }}>Scribe</span></Link>
                    </li>
                    <li>
                        <Link id="aboutus" to="/aboutus"
                        onClick={collapseMenu}>About us</Link>
                    </li>
                    <li>
                        <Link id="formsubmission" to="/formsubmission"
                        onClick={collapseMenu}>User feedback</Link>
                    </li>
                    <li className="push">
                        <Link to="/loginSignupPage"  onClick={signout}>Log out
                        <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                        </Link>
                    </li>
                  </ul>
                 {/* hamburger icon for small screens */}
                  <Link href="javascript:void(0);" class="icon" onClick={collapseMenu}>
                      <i class="fa fa-bars"></i>
                  </Link>
                </div>
              </nav>
              )
            }
          </div>
        </nav>
        <Outlet />
      </div>
    )
  };

  export default Layout;
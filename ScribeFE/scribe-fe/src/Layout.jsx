
import { Outlet, Link } from "react-router-dom";
import "./styles/layout.css"
import { useState } from "react";

const Layout = () => {
    const [action,setAction] = useState("Sign up/Login")

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
                  <li class="push">
                      <Link to="/loginSignupPage">{action}</Link>
                  </li>
              </div>
          </div>
        </nav>
        <Outlet />
      </>
    )
  };

  export default Layout;
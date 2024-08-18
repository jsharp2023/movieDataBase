import {Link, NavLink} from 'react-router-dom'
import "./Nav.css"

function Nav({user, handelUserLogout}) {

  return (
    <nav className='Navbar'>
        <div className="h1-logo">
            <h1>
                <Link to= "/">Home</Link>
            </h1>
        </div>
        <div className="right-side-nav">
            <ul>{
                user ? 
                <li>
                  <NavLink to="/profile">
                    {"Profile"}
                    </NavLink>
                </li> : 
                <li>
                  <NavLink to="/sign-up">
                      Sign up
                  </NavLink>
                </li>
                } 
                {
                  user ?
                  <li>
                  <NavLink
                     
                    to="/login"
                    onClick={handelUserLogout}
                    >
                      Logout
                    
                    </NavLink>
                  </li>
                :
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
  }
            </ul>
        </div>
      </nav>
  )
}

export default Nav








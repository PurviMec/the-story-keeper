import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import appLogo from "../../images/appLogo.png"

const Header = () => {
  const logout = event => {
  event.preventDefault();
  Auth.logout();
};

  return (
    <header className="header">
      <div className=" container flex-row display-inline row">
            <div className='col-2 mt-3'><img src={appLogo} className='logo' alt="App-logo"></img></div>
            <div className='col-7 text-center head-title mt-3'>
              <Link to="/">
              <h1 className='mt-3 '>THE STORY KEEPER</h1>
            </Link>
            </div>
          <div className='col-3 mt-3' >
            <nav className="text-center m-2 mt-4">  
              { Auth.loggedIn() ? (
                <>
                  <Link to="/profile">Me</Link>
                  <a href='/' onClick={logout}>
                    LogOut
                  </a>
                </>
              ):(
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </nav>
         </div>
        </div>
    </header>
  );
};

export default Header;
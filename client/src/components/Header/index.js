import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
  event.preventDefault();
  Auth.logout();
};

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <nav className="text-center m-4">
            <Link to="/">
              <h1>THE STORY KEEPER</h1>
            </Link>
            { Auth.loggedIn() ? (
              <>
                <Link to="/profile">Me</Link>
                <a href='/' onClick={logout}>
                  LogOut
                </a>
                Search
              </>
            ):(
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/profile">Profile</Link>
                Search
              </>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
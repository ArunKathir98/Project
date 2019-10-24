import React from 'react';
import logo from '../Images/logo.png';
import Home from './Home';
const Header = () => {
  return (
    <div>
      <header className="Heading">
        <div className="Header">
          <img src={logo} className="Logo" alt="logo" />
          <span className="Title">Smile Chat</span>
        </div>
      </header>
      <div>
        {localStorage.getItem("user_id") == null ? <Home /> : null}
      </div>
    </div>
  );
}
export default Header;

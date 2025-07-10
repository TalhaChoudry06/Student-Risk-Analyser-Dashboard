import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; 
import GoogleLoginButton from './GoogleLoginButton.jsx'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
      </ul>
      <GoogleLoginButton />
    </nav>
  );
};

export default Navbar;

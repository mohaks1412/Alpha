import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          ChatApp
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">

            <Link to="/" className="nav-item">Home</Link>
          {isLoggedIn ? (
            <>
              
              <Link to="/users" className="nav-item">Contacts</Link>
              <Link to="/me" className="nav-item">Profile</Link>
              <button onClick={handleLogout} className="nav-item nav-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/signup" className="nav-item">Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Sidebar */}
        <div className={`nav-links mobile ${menuOpen ? "open" : ""}`}>
          {isLoggedIn ? (
            <>
              <Link to="/" className="nav-item" onClick={closeMenu}>Home</Link>
              <Link to="/users" className="nav-item" onClick={closeMenu}>Contacts</Link>
              <Link to="/me" className="nav-item" onClick={closeMenu}>Profile</Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="nav-item nav-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item" onClick={closeMenu}>Login</Link>
              <Link to="/signup" className="nav-item" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </div>

        {/* Backdrop overlay */}
        {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

export default Navbar;

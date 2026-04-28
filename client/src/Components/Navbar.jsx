import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import React from 'react';

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout, user } = useContext(AuthContext);

  function handleStart()  { setOpen(false); navigate(auth ? '/HomePage' : '/register'); }
  function handleLogout() { setOpen(false); logout(); navigate('/login'); }
  function toggleMenu()   { setOpen(function(o) { return !o; }); }

  const navStyle = {
    background: "rgba(8,8,16,0.9)",
    borderBottom: "1px solid rgba(139,92,246,0.15)",
    position: "sticky", top: 0, zIndex: 50,
  };

  const innerStyle = {
    maxWidth: "1152px", margin: "0 auto", padding: "0 24px",
    display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px",
  };

  const aStyle = {
    color: "#9ca3af", fontSize: "14px", fontWeight: "500",
    textDecoration: "none", transition: "color 0.2s",
  };

  const mobileAStyle = {
    color: "#9ca3af", fontSize: "15px", fontWeight: "500",
    textDecoration: "none", padding: "10px 12px", borderRadius: "10px",
    display: "block",
  };

  const logoutBtnStyle = {
    padding: "8px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: "600",
    background: "transparent", border: "1px solid rgba(239,68,68,0.4)",
    color: "#fca5a5", cursor: "pointer",
  };

  const startBtnStyle = {
    padding: "8px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: "600",
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    border: "none", color: "#fff", cursor: "pointer",
  };

  const hamburgerStyle = {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: "8px", padding: "8px", color: "#a78bfa", cursor: "pointer",
    fontSize: "18px", lineHeight: 1,
  };

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>

        {/* Logo */}
        <div onClick={handleStart} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <img
            src="/logo.jpeg"
            alt="Logo"
            style={{ height: 36, width: 36, borderRadius: "50%", border: "1px solid rgba(139,92,246,0.4)", objectFit: "cover" }}
          />
          <span style={{ color: "#fff", fontWeight: "700", fontSize: "18px", letterSpacing: "-0.5px" }}>
            Shakti Shield
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
          <a href="/" style={aStyle}>Home</a>
          {auth && <a href="/Progress" style={aStyle}>Progress</a>}
          {auth && <a href="/reviews" style={aStyle}>Reviews</a>}
          {user?.isAdmin && <a href="/admin" style={aStyle}>Admin</a>}
          <a href="mailto:srajalthakur8@gmail.com" style={aStyle}>Contact Us</a>
          {auth
            ? <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
            : <button onClick={handleStart}  style={startBtnStyle}>Get Started</button>
          }
        </div>

        {/* Hamburger */}
        <button onClick={toggleMenu} style={hamburgerStyle} className="md:hidden">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{ background: "rgba(12,12,20,0.98)", borderTop: "1px solid rgba(139,92,246,0.15)", padding: "16px 24px 20px" }}>
          <a href="/" onClick={function() { setOpen(false); }} style={mobileAStyle}>Home</a>
          {auth && <a href="/Progress" onClick={function() { setOpen(false); }} style={mobileAStyle}>Progress</a>}
          {auth && <a href="/reviews"  onClick={function() { setOpen(false); }} style={mobileAStyle}>Reviews</a>}
          {user?.isAdmin && <a href="/admin" onClick={function() { setOpen(false); }} style={mobileAStyle}>Admin</a>}
          <a href="mailto:srajalthakur8@gmail.com" onClick={function() { setOpen(false); }} style={mobileAStyle}>Contact Us</a>
          <div style={{ borderTop: "1px solid rgba(139,92,246,0.15)", marginTop: "8px", paddingTop: "12px" }}>
            {auth
              ? <button onClick={handleLogout} style={{ ...logoutBtnStyle, width: "100%", borderRadius: "10px" }}>Logout</button>
              : <button onClick={handleStart}  style={{ ...startBtnStyle,  width: "100%", borderRadius: "10px" }}>Get Started</button>
            }
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
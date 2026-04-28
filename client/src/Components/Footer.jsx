import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {

  const linkStyle = { color: "#9ca3af", display: "block", fontSize: "14px", textDecoration: "none", marginBottom: "12px" };
  const socialStyle = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: "36px", height: "36px", borderRadius: "50%",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)",
    color: "#a78bfa", textDecoration: "none"
  };
  const legalLinkStyle = { color: "#6b7280", textDecoration: "none" };

  return (
    <footer
      style={{
        background: "#080810",
        borderTop: "1px solid rgba(139,92,246,0.15)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "64px",
        paddingBottom: "32px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      {/* Glow orbs */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "288px", height: "288px", borderRadius: "50%",
        background: "rgba(139,92,246,0.08)", filter: "blur(80px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "256px", height: "256px", borderRadius: "50%",
        background: "rgba(109,40,217,0.07)", filter: "blur(80px)", pointerEvents: "none"
      }} />

      {/* Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <img
              src="/logo.jpeg"
              alt="Shakti Shield Logo"
              style={{ height: "40px", width: "40px", borderRadius: "50%", border: "1px solid rgba(139,92,246,0.4)" }}
            />
            <span style={{ color: "#fff", fontWeight: "700", fontSize: "18px", letterSpacing: "-0.5px" }}>
              Shakti Shield
            </span>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
            Your companion in safety — empowering women to feel secure, confident, and connected.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="#" style={socialStyle}><FaInstagram size={15} /></a>
            <a href="#" style={socialStyle}><FaFacebook size={15} /></a>
            <a href="#" style={socialStyle}><FaLinkedin size={15} /></a>
            <a href="#" style={socialStyle}><FaTwitter size={15} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ color: "#a78bfa", fontSize: "11px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Quick Links
          </h3>
          <a href="/HomePage" style={linkStyle}>Home</a>
          <a href="/reviews"  style={linkStyle}>Reviews</a>
          <a href="/profile"  style={linkStyle}>Profile</a>
          <a href="/settings" style={linkStyle}>Settings</a>
        </div>

        {/* Newsletter */}
        <div>
          <h3 style={{ color: "#a78bfa", fontSize: "11px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Stay Connected
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "16px" }}>
            Get safety tips and updates in your inbox.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                flex: 1, fontSize: "14px", padding: "8px 16px", borderRadius: "12px",
                outline: "none", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(139,92,246,0.25)", color: "#e2e8f0"
              }}
            />
            <button
              style={{
                padding: "8px 16px", borderRadius: "12px", fontSize: "14px",
                fontWeight: "600", border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff"
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        maxWidth: "72rem", margin: "48px auto 24px"
      }} />

      {/* Legal */}
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ fontSize: "12px", color: "#6b7280" }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="/terms"      style={legalLinkStyle}>Terms of Service</a>
          <a href="/privacy"    style={legalLinkStyle}>Privacy Policy</a>
          <a href="/disclaimer" style={legalLinkStyle}>Disclaimer</a>
        </div>
        <p style={{ margin: 0 }}>© 2025 Shakti Shield. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
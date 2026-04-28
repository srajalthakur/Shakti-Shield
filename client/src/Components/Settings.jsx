import React, { useContext, useState } from 'react';
import { ChevronLeft, User, Mail, Lock, Shield, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../URL/CustomApi';
import { Config } from '../../URL/Config';
import { AuthContext } from '../Context/AuthContext';

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(139,92,246,0.25)",
  color: "#e2e8f0",
  borderRadius: "12px",
  padding: "12px 16px",
  width: "100%",
  outline: "none",
  fontSize: "14px",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  color: "#9ca3af",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  marginBottom: "8px",
};

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(139,92,246,0.2)",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "16px",
};

function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState('account');

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: { username: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      if (data.username) {
        const res = await api.post(Config.UPDATEUSERNAME, { username: data.username });
        if (res.data.success) { setSuccessMessage('Username updated successfully'); reset({ username: '' }); }
      }
      if (data.email) {
        const res = await api.post(Config.UPDATEEMAIL, { email: data.email, isGoogleUser: user.isGoogleUser });
        if (res.data.success) { setSuccessMessage('Email updated successfully'); reset({ email: '' }); }
      }
      if (data.currentPassword && data.newPassword) {
        if (data.newPassword !== data.confirmPassword) { setError('New passwords do not match'); return; }
        const res = await api.post(Config.UPDATEPASSWORD, { currentPassword: data.currentPassword, newPassword: data.newPassword });
        if (res.data.success) { setSuccessMessage('Password updated successfully'); reset({ currentPassword: '', newPassword: '', confirmPassword: '' }); }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally { setLoading(false); }
  };

  const newPassword = watch('newPassword');
  const strength = !newPassword ? 0 : [
    newPassword.length >= 8,
    /[A-Z]/.test(newPassword),
    /[0-9]/.test(newPassword),
    /[^A-Za-z0-9]/.test(newPassword),
  ].filter(Boolean).length;

  const strengthLabel = ['', 'Weak', 'Moderate', 'Strong', 'Very strong'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#10b981'];
  const strengthWidth = ['0%', '25%', '50%', '75%', '100%'];

  const tabs = [
    { key: 'account',  label: 'Account'  },
    { key: 'security', label: 'Security' },
    { key: 'privacy',  label: 'Privacy'  },
  ];

  return (
    <div style={{ background: "#080810", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .set-title { font-family: 'Syne', sans-serif; }
        .set-body  { font-family: 'DM Sans', sans-serif; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .set-input::placeholder { color: rgba(148,163,184,0.4); }
        .set-input:focus {
          border-color: rgba(168,85,247,0.6) !important;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
        }
        .toggle-track {
          width: 44px; height: 24px; border-radius: 100px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(139,92,246,0.25);
          position: relative; cursor: pointer; transition: all 0.3s;
        }
        .toggle-track.on { background: rgba(124,58,237,0.6); border-color: rgba(139,92,246,0.6); }
        .toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; transition: all 0.3s;
        }
        .toggle-track.on .toggle-thumb { left: 23px; }
      `}</style>

      <div className="grid-bg" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <div style={{
        position: "fixed", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 500, height: 350, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)"
      }} />

      <div className="set-body" style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "0 16px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "24px 0 20px" }}>
          <Link
            to="/profile"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#a78bfa", textDecoration: "none"
            }}
          >
            <ChevronLeft size={18} />
          </Link>
          <div>
            <h1 className="set-title" style={{ color: "#fff", fontSize: "20px", margin: 0, letterSpacing: "-0.5px" }}>
              Account Settings
            </h1>
            <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>Manage your profile and security</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: "4px", padding: "4px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.15)",
          borderRadius: "12px", marginBottom: "24px"
        }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveSection(t.key)}
              style={{
                flex: 1, padding: "8px", borderRadius: "9px", fontSize: "13px",
                fontWeight: "500", cursor: "pointer", border: "none", transition: "all 0.2s",
                background: activeSection === t.key
                  ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                  : "transparent",
                color: activeSection === t.key ? "#fff" : "#9ca3af",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Error / Success */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "12px", padding: "12px 16px", marginBottom: "16px",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            <X size={15} style={{ color: "#fca5a5" }} />
            <span style={{ color: "#fca5a5", fontSize: "14px" }}>{error}</span>
          </div>
        )}
        {successMessage && (
          <div style={{
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "12px", padding: "12px 16px", marginBottom: "16px",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            <Check size={15} style={{ color: "#86efac" }} />
            <span style={{ color: "#86efac", fontSize: "14px" }}>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Account tab */}
          {activeSection === 'account' && (
            <>
              <div style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <User size={16} style={{ color: "#a78bfa" }} />
                  <h2 className="set-title" style={{ color: "#e2e8f0", fontSize: "15px", margin: 0 }}>Update Username</h2>
                </div>
                <label style={labelStyle}>New Username</label>
                <input
                  type="text"
                  className="set-input"
                  placeholder="Enter new username"
                  style={inputStyle}
                  {...register('username', { minLength: { value: 3, message: 'At least 3 characters' } })}
                />
                {errors.username && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "6px" }}>{errors.username.message}</p>}
              </div>

              <div style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <Mail size={16} style={{ color: "#a78bfa" }} />
                  <h2 className="set-title" style={{ color: "#e2e8f0", fontSize: "15px", margin: 0 }}>Update Email</h2>
                </div>
                <label style={labelStyle}>New Email</label>
                <input
                  type="email"
                  className="set-input"
                  placeholder="Enter new email"
                  style={inputStyle}
                  {...register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
                />
                {errors.email && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "6px" }}>{errors.email.message}</p>}
              </div>
            </>
          )}

          {/* Security tab */}
          {activeSection === 'security' && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Lock size={16} style={{ color: "#a78bfa" }} />
                <h2 className="set-title" style={{ color: "#e2e8f0", fontSize: "15px", margin: 0 }}>Update Password</h2>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Current Password</label>
                <input type="password" className="set-input" placeholder="Enter current password" style={inputStyle} {...register('currentPassword')} />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>New Password</label>
                <input
                  type="password" className="set-input" placeholder="Enter new password" style={inputStyle}
                  {...register('newPassword', { minLength: { value: 6, message: 'At least 6 characters' } })}
                />
                {errors.newPassword && <p style={{ color: "#fca5a5", fontSize: "12px", marginTop: "6px" }}>{errors.newPassword.message}</p>}
                {newPassword && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ color: "#6b7280", fontSize: "11px" }}>Strength</span>
                      <span style={{ fontSize: "11px", color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "100px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: "100px",
                        width: strengthWidth[strength],
                        background: strengthColor[strength],
                        transition: "all 0.4s"
                      }} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Confirm New Password</label>
                <input type="password" className="set-input" placeholder="Confirm new password" style={inputStyle} {...register('confirmPassword')} />
              </div>
            </div>
          )}

          {/* Privacy tab */}
          {activeSection === 'privacy' && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Shield size={16} style={{ color: "#a78bfa" }} />
                <h2 className="set-title" style={{ color: "#e2e8f0", fontSize: "15px", margin: 0 }}>Privacy Settings</h2>
              </div>

              {[
                { label: "Location Sharing", desc: "Control who can see your location" },
                { label: "Activity Status",  desc: "Show when you're active"          },
              ].map(function(item) {
                return (
                  <ToggleRow key={item.label} label={item.label} desc={item.desc} />
                );
              })}

              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.12)",
                borderRadius: "12px", marginBottom: "8px"
              }}>
                <div>
                  <p style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "500", margin: "0 0 2px" }}>Emergency Contacts</p>
                  <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>Who can see your emergency contacts</p>
                </div>
                <select style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.25)",
                  color: "#e2e8f0", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", outline: "none"
                }}>
                  <option style={{ background: "#111" }}>Only Me</option>
                  <option style={{ background: "#111" }}>Trusted Contacts</option>
                  <option style={{ background: "#111" }}>Public</option>
                </select>
              </div>
            </div>
          )}

          {/* Save button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "14px", borderRadius: "12px", fontSize: "15px",
              fontWeight: "600", border: "none", cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              marginTop: "8px", opacity: loading ? 0.7 : 1, transition: "all 0.2s"
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite"
                }} />
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ToggleRow(props) {
  const [on, setOn] = useState(true);
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 16px",
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.12)",
      borderRadius: "12px", marginBottom: "8px"
    }}>
      <div>
        <p style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "500", margin: "0 0 2px" }}>{props.label}</p>
        <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>{props.desc}</p>
      </div>
      <div className={"toggle-track" + (on ? " on" : "")} onClick={function() { setOn(function(v) { return !v; }); }}>
        <div className="toggle-thumb" />
      </div>
    </div>
  );
}

export default Settings;
import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Config } from '../../URL/Config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  User, Mail, Lock, Camera, Shield, ChevronRight,
  Star, Activity, LogOut, Edit3, Check, X, ArrowLeft
} from 'lucide-react';

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  const [sosCount, setSosCount] = useState(0);
  const [editField, setEditField] = useState(null); // 'username' | 'email' | 'password'

  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    axios.get(Config.GETSOSLOGSUrl, { withCredentials: true })
      .then(({ data }) => setSosCount(data.logs.length))
      .catch(() => setSosCount(0));
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const { data } = await axios.post(Config.UPDATEPHOTOUrl, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(prev => ({ ...prev, profilePhoto: data.updatedUser.profilePhoto }));
      toast.success('Photo updated!');
    } catch {
      toast.error('Photo upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmitField = async (data) => {
    try {
      let url, payload;
      if (editField === 'username') {
        url = Config.UPDATEUSERNAMEUrl;
        payload = { username: data.username };
      } else if (editField === 'email') {
        url = Config.UPDATEEMAILUrl;
        payload = { email: data.email };
      } else if (editField === 'password') {
        if (data.newPassword !== data.confirmPassword) {
          toast.error("Passwords don't match");
          return;
        }
        url = Config.UPDATEPASSWORDUrl;
        payload = { oldPassword: data.oldPassword, newPassword: data.newPassword };
      }
      const res = await axios.post(url, payload, { withCredentials: true });
      if (editField !== 'password') {
        setUser(prev => ({ ...prev, ...payload }));
      }
      toast.success(res.data.message || 'Updated!');
      setEditField(null);
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    }
  };

  const avatarUrl = user?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'U')}&background=7c3aed&color=fff&size=200`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e2e8f0',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Background orbs */}
      <div style={{
        position: 'fixed', top: '-200px', left: '-200px',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px', margin: '0 auto', padding: '24px 20px 100px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Link to="/home" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa', textDecoration: 'none', transition: 'all 0.2s'
          }}>
            <ArrowLeft size={18} />
          </Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 700, margin: 0, color: '#f1f5f9' }}>
            My Profile
          </h1>
        </div>

        {/* Avatar Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(20,20,35,0.8) 100%)',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '24px',
          padding: '32px 24px',
          textAlign: 'center',
          marginBottom: '20px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(124,58,237,0.1)'
        }}>
          {/* Avatar */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <div style={{
              width: '96px', height: '96px', borderRadius: '50%',
              border: '3px solid rgba(124,58,237,0.6)',
              boxShadow: '0 0 30px rgba(124,58,237,0.4)',
              overflow: 'hidden', margin: '0 auto'
            }}>
              <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <label style={{
              position: 'absolute', bottom: '2px', right: '2px',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(124,58,237,0.5)'
            }}>
              {isUploading ? (
                <div style={{ width: '12px', height: '12px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <Camera size={12} color="white" />
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#f1f5f9' }}>
            {user?.username || 'User'}
          </h2>
          <p style={{ margin: '0 0 20px', color: '#94a3b8', fontSize: '13px' }}>{user?.email}</p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: "'Syne', sans-serif", color: '#f59e0b', lineHeight: 1 }}>
                {sosCount}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                SOS Alerts
              </div>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: "'Syne', sans-serif", color: '#34d399', lineHeight: 1 }}>
                {user?.contacts?.length || 0}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Contacts
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div style={{
          background: 'rgba(15,15,25,0.8)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '20px',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ padding: '16px 20px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Account Settings
            </span>
          </div>

          {/* Username row */}
          <SettingRow
            icon={<User size={16} />}
            label="Username"
            value={user?.username}
            isEditing={editField === 'username'}
            onEdit={() => { setEditField('username'); reset(); }}
            onCancel={() => setEditField(null)}
          >
            {editField === 'username' && (
              <form onSubmit={handleSubmit(onSubmitField)} style={{ padding: '12px 20px', background: 'rgba(124,58,237,0.05)', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
                <input
                  {...register('username', { required: true })}
                  defaultValue={user?.username}
                  placeholder="New username"
                  style={inputStyle}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" style={saveBtn}>Save</button>
                  <button type="button" onClick={() => setEditField(null)} style={cancelBtn}>Cancel</button>
                </div>
              </form>
            )}
          </SettingRow>

          {/* Email row */}
          <SettingRow
            icon={<Mail size={16} />}
            label="Email"
            value={user?.email}
            isEditing={editField === 'email'}
            onEdit={() => { setEditField('email'); reset(); }}
            onCancel={() => setEditField(null)}
          >
            {editField === 'email' && (
              <form onSubmit={handleSubmit(onSubmitField)} style={{ padding: '12px 20px', background: 'rgba(124,58,237,0.05)', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
                <input
                  {...register('email', { required: true })}
                  defaultValue={user?.email}
                  type="email"
                  placeholder="New email"
                  style={inputStyle}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" style={saveBtn}>Save</button>
                  <button type="button" onClick={() => setEditField(null)} style={cancelBtn}>Cancel</button>
                </div>
              </form>
            )}
          </SettingRow>

          {/* Password row */}
          <SettingRow
            icon={<Lock size={16} />}
            label="Password"
            value={user?.googleId ? "Managed by Google" : "••••••••"}
            isEditing={editField === 'password'}
            onEdit={() => {
              const isGoogle = user?.isGoogleUser || user?.googleId || user?.email?.includes('gmail');
              if (isGoogle) {
                toast.info('This account uses Google login. Password is managed by Google.');
                return;
              }
              setEditField('password');
              reset();
            }}
            onCancel={() => setEditField(null)}
            isLast
          >

            {editField === 'password' && (
              <form onSubmit={handleSubmit(onSubmitField)} style={{ padding: '12px 20px', background: 'rgba(124,58,237,0.05)', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
                <input {...register('oldPassword', { required: true })} type="password" placeholder="Current password" style={{ ...inputStyle, marginBottom: '8px' }} autoFocus />
                <input {...register('newPassword', { required: true })} type="password" placeholder="New password" style={{ ...inputStyle, marginBottom: '8px' }} />
                <input {...register('confirmPassword', { required: true })} type="password" placeholder="Confirm new password" style={inputStyle} />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" style={saveBtn}>Save</button>
                  <button type="button" onClick={() => setEditField(null)} style={cancelBtn}>Cancel</button>
                </div>
              </form>
            )}
          </SettingRow>
        </div>

        {/* Quick Links */}
        <div style={{
          background: 'rgba(15,15,25,0.8)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '20px',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ padding: '16px 20px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Navigation
            </span>
          </div>
          <LinkRow icon={<Activity size={16} />} label="SOS Activity Log" to="/Progress" color="#f59e0b" />
          <LinkRow icon={<Star size={16} />} label="My Reviews" to="/reviews" color="#34d399" />
          <LinkRow icon={<Shield size={16} />} label="Emergency Contacts" to="/home" color="#60a5fa" isLast />
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            width: '100%', padding: '16px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '16px', color: '#f87171',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(239,68,68,0.15)'; e.target.style.borderColor = 'rgba(239,68,68,0.4)'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(239,68,68,0.08)'; e.target.style.borderColor = 'rgba(239,68,68,0.2)'; }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const SettingRow = ({ icon, label, value, isEditing, onEdit, onCancel, isLast, children }) => (
  <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', cursor: 'pointer'
    }}
      onClick={isEditing ? onCancel : onEdit}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: 'rgba(124,58,237,0.15)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: '#a78bfa'
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 500, marginTop: '1px' }}>{value}</div>
        </div>
      </div>
      <div style={{ color: isEditing ? '#a78bfa' : '#475569', transition: 'color 0.2s' }}>
        {isEditing ? <X size={16} /> : <Edit3 size={14} />}
      </div>
    </div>
    {children}
  </div>
);

const LinkRow = ({ icon, label, to, color, isLast }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px',
      borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
      transition: 'background 0.15s'
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: `${color}18`, display: 'flex',
          alignItems: 'center', justifyContent: 'center', color
        }}>
          {icon}
        </div>
        <span style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 500 }}>{label}</span>
      </div>
      <ChevronRight size={16} color="#475569" />
    </div>
  </Link>
);

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: 'rgba(0,0,0,0.4)',
  border: '1px solid rgba(124,58,237,0.3)',
  borderRadius: '10px', color: '#e2e8f0',
  fontSize: '14px', outline: 'none',
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: 'border-box',
  colorScheme: 'dark'
};

const saveBtn = {
  padding: '8px 20px', borderRadius: '8px',
  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  border: 'none', color: 'white', fontSize: '13px',
  fontWeight: 600, cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif"
};

const cancelBtn = {
  padding: '8px 16px', borderRadius: '8px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#94a3b8', fontSize: '13px',
  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
};

export default Profile;
import { useEffect, useState, useContext } from 'react';
import api from '../../URL/CustomApi';
import { Config } from '../../URL/Config';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Shield, AlertTriangle, MapPin, Clock,
  CheckCircle, XCircle, LogOut, ChevronRight,
  Activity, Mail, Calendar, Phone, Trash2
} from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (authLoading) return;
    if (!user || !user.isAdmin) {
        navigate('/HomePage');
    }
    }, [user, authLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [statsRes, usersRes] = await Promise.all([
            api.get('http://localhost:5000/api/admin/stats'),
            api.get('http://localhost:5000/api/admin/users')
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data.users);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete ${username}? This action cannot be undone.`)) {
      return;
    }

    try {
      await api.delete('http://localhost:5000/api/admin/delete-user', {
        data: { userId }
      });
      setUsers(users.filter(u => u._id !== userId));
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers - 1
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .admin-root { font-family: 'DM Sans', sans-serif; background: #06060d; min-height: 100vh; }
        .admin-title { font-family: 'Syne', sans-serif; }
        .grid-bg {
          background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .stat-card {
          background: rgba(15,15,25,0.9);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-card:hover::before { opacity: 1; }
        .stat-card:hover { border-color: rgba(124,58,237,0.4); transform: translateY(-2px); }
        .glass-card {
          background: rgba(15,15,25,0.9);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }
        .tab-btn {
          padding: 8px 20px; border-radius: 10px; font-size: 13px;
          font-weight: 500; cursor: pointer; transition: all 0.2s;
          border: none; font-family: 'DM Sans', sans-serif;
        }
        .tab-active {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
        }
        .tab-inactive {
          background: rgba(255,255,255,0.05);
          color: #94a3b8;
        }
        .tab-inactive:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
        .user-row {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .user-row:last-child { border-bottom: none; }
        .user-row:hover { background: rgba(124,58,237,0.05); }
        .sos-row {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .sos-row:last-child { border-bottom: none; }
        .sos-row:hover { background: rgba(124,58,237,0.05); }
        .badge-success { background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.25); color: #86efac; }
        .badge-failed { background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); color: #fca5a5; }
        .badge-admin { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: #fcd34d; }
        .badge-google { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25); color: #93c5fd; }
        .sidebar {
          width: 240px; min-height: 100vh;
          background: rgba(10,10,18,0.95);
          border-right: 1px solid rgba(124,58,237,0.15);
          position: fixed; top: 0; left: 0;
          display: flex; flex-direction: column;
          padding: 28px 16px;
          z-index: 10;
        }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 12px;
          cursor: pointer; transition: all 0.2s;
          font-size: 13px; font-weight: 500;
          margin-bottom: 4px;
        }
        .nav-active { background: rgba(124,58,237,0.2); color: #a78bfa; }
        .nav-inactive { color: #64748b; }
        .nav-inactive:hover { background: rgba(255,255,255,0.04); color: #94a3b8; }
        .main-content { margin-left: 240px; padding: 32px; }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main-content { margin-left: 0; padding: 16px; }
        }
      `}</style>

      <div className="admin-root">
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        {/* Ambient glow */}
        <div style={{ position:'fixed', top:'-200px', left:'120px', width:'500px', height:'500px', background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        {/* Sidebar */}
        <div className="sidebar">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div style={{ width:36,height:36,background:'linear-gradient(135deg,#7c3aed,#a855f7)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>
              🛡️
            </div>
            <div>
              <p className="admin-title text-white font-bold text-sm">Shakti Shield</p>
              <p style={{ color:'#f59e0b', fontSize:'10px', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase' }}>Admin Panel</p>
            </div>
          </div>

          <div className="mb-2">
            <p style={{ fontSize:'10px', fontWeight:600, color:'#374151', letterSpacing:'1.5px', textTransform:'uppercase', padding:'0 14px', marginBottom:'8px' }}>Menu</p>
            {[
              { key: 'overview', icon: Activity, label: 'Overview' },
              { key: 'users', icon: Users, label: 'All Users' },
              { key: 'sos', icon: AlertTriangle, label: 'SOS Logs' },
            ].map(item => (
              <div
                key={item.key}
                className={`nav-item ${activeTab === item.key ? 'nav-active' : 'nav-inactive'}`}
                onClick={() => setActiveTab(item.key)}
              >
                <item.icon size={15} />
                {item.label}
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div style={{ padding:'12px 14px', background:'rgba(124,58,237,0.08)', borderRadius:12, border:'1px solid rgba(124,58,237,0.15)', marginBottom:12 }}>
              <p className="text-white text-xs font-semibold truncate">{user?.username}</p>
              <p style={{ color:'#f59e0b', fontSize:'10px' }}>Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="nav-item nav-inactive w-full"
              style={{ color:'#f87171', width:'100%' }}
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content relative z-10">

          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              className="admin-title text-3xl font-bold text-white mb-1"
            >
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'users' ? 'User Management' : 'SOS Activity Logs'}
            </motion.h1>
            <p style={{ color:'#64748b', fontSize:'13px' }}>
              {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            </p>
          </div>

          {dataLoading ? (
            <div className="flex items-center justify-center h-64">
              <div style={{ width:40,height:40,border:'3px solid rgba(124,58,237,0.3)',borderTopColor:'#7c3aed',borderRadius:'50%',animation:'spin 0.8s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : error ? (
            <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:16, padding:24, color:'#fca5a5' }}>
              {error}
            </div>
          ) : (
            <AnimatePresence mode="wait">

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity:0, y:16 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-16 }}
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="stat-card">
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                        <div style={{ width:40,height:40,background:'rgba(124,58,237,0.15)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center' }}>
                          <Users size={18} color="#a78bfa" />
                        </div>
                        <span style={{ fontSize:'10px', fontWeight:600, color:'#22c55e', background:'rgba(34,197,94,0.1)', padding:'3px 8px', borderRadius:100 }}>Total</span>
                      </div>
                      <p className="admin-title text-white font-bold" style={{ fontSize:36, lineHeight:1 }}>{users.length}</p>
                      <p style={{ color:'#64748b', fontSize:'12px', marginTop:6 }}>Registered Users</p>
                    </div>

                    <div className="stat-card">
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                        <div style={{ width:40,height:40,background:'rgba(239,68,68,0.12)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center' }}>
                          <AlertTriangle size={18} color="#f87171" />
                        </div>
                        <span style={{ fontSize:'10px', fontWeight:600, color:'#f59e0b', background:'rgba(245,158,11,0.1)', padding:'3px 8px', borderRadius:100 }}>Alerts</span>
                      </div>
                      <p className="admin-title text-white font-bold" style={{ fontSize:36, lineHeight:1 }}>{stats?.totalSOS || 0}</p>
                      <p style={{ color:'#64748b', fontSize:'12px', marginTop:6 }}>SOS Alerts Sent</p>
                    </div>

                    <div className="stat-card">
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                        <div style={{ width:40,height:40,background:'rgba(34,197,94,0.12)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center' }}>
                          <Shield size={18} color="#86efac" />
                        </div>
                        <span style={{ fontSize:'10px', fontWeight:600, color:'#60a5fa', background:'rgba(59,130,246,0.1)', padding:'3px 8px', borderRadius:100 }}>Active</span>
                      </div>
                      <p className="admin-title text-white font-bold" style={{ fontSize:36, lineHeight:1 }}>
                        {users.filter(u => u.isGoogleUser).length}
                      </p>
                      <p style={{ color:'#64748b', fontSize:'12px', marginTop:6 }}>Google Users</p>
                    </div>
                  </div>

                  {/* Recent SOS */}
                  <div className="glass-card mb-6">
                    <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <h2 className="admin-title text-white font-bold text-base">Recent SOS Alerts</h2>
                      <button onClick={() => setActiveTab('sos')} style={{ color:'#a78bfa', fontSize:'12px', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                        View all <ChevronRight size={14} />
                      </button>
                    </div>
                    {stats?.recentSOS?.length === 0 ? (
                      <div style={{ padding:32, textAlign:'center', color:'#64748b', fontSize:13 }}>No SOS alerts yet</div>
                    ) : (
                      stats?.recentSOS?.slice(0, 5).map((log, i) => (
                        <div key={log._id || i} className="sos-row">
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                              <div style={{ width:36,height:36,background:'rgba(239,68,68,0.1)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center' }}>
                                <AlertTriangle size={16} color="#f87171" />
                              </div>
                              <div>
                                <p style={{ color:'#e2e8f0', fontSize:'13px', fontWeight:500 }}>{log.user?.username || 'Unknown'}</p>
                                <p style={{ color:'#64748b', fontSize:'11px' }}>{log.user?.email}</p>
                              </div>
                            </div>
                            <div style={{ textAlign:'right' }}>
                              <span className={`text-xs px-2 py-1 rounded-full ${log.status === 'success' ? 'badge-success' : 'badge-failed'}`}>
                                {log.status}
                              </span>
                              <p style={{ color:'#64748b', fontSize:'11px', marginTop:4 }}>
                                {new Date(log.triggeredAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {log.location && (
                            <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
                              <MapPin size={11} color="#a78bfa" />
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${log.location.latitude},${log.location.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color:'#a78bfa', fontSize:'11px', textDecoration:'none' }}
                              >
                                {log.location.latitude?.toFixed(4)}, {log.location.longitude?.toFixed(4)} →
                              </a>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Recent Users */}
                  <div className="glass-card">
                    <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <h2 className="admin-title text-white font-bold text-base">Recent Users</h2>
                      <button onClick={() => setActiveTab('users')} style={{ color:'#a78bfa', fontSize:'12px', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                        View all <ChevronRight size={14} />
                      </button>
                    </div>
                    {users.slice(0, 5).map((u, i) => (
                      <div key={u._id || i} className="user-row">
                        <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#7c3aed,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:14,flexShrink:0 }}>
                          {u.username?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ color:'#e2e8f0', fontSize:'13px', fontWeight:500 }}>{u.username}</p>
                          <p style={{ color:'#64748b', fontSize:'11px' }}>{u.email}</p>
                        </div>
                        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                          {u.isAdmin && <span className="badge-admin text-xs px-2 py-0.5 rounded-full">Admin</span>}
                          {u.isGoogleUser && <span className="badge-google text-xs px-2 py-0.5 rounded-full">Google</span>}
                          {!u.isAdmin && (
                            <button
                              onClick={() => handleDeleteUser(u._id, u.username)}
                              style={{ background:'none', border:'none', color:'#f87171', cursor:'pointer', padding:'4px' }}
                              title="Delete user"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity:0, y:16 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-16 }}
                >
                  <div className="glass-card">
                    <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <h2 className="admin-title text-white font-bold text-base">All Users ({users.length})</h2>
                    </div>
                    {users.map((u, i) => (
                      <div key={u._id || i} className="user-row">
                        <div style={{ width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#7c3aed,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:15,flexShrink:0 }}>
                          {u.username?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <p style={{ color:'#e2e8f0', fontSize:'14px', fontWeight:600 }}>{u.username}</p>
                            {u.isAdmin && <span className="badge-admin text-xs px-2 py-0.5 rounded-full">Admin</span>}
                            {u.isGoogleUser && <span className="badge-google text-xs px-2 py-0.5 rounded-full">Google</span>}
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:3 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                              <Mail size={11} color="#64748b" />
                              <span style={{ color:'#64748b', fontSize:'11px' }}>{u.email}</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                              <Phone size={11} color="#64748b" />
                              <span style={{ color:'#64748b', fontSize:'11px' }}>{u.contacts?.length || 0} contacts</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                              <Calendar size={11} color="#64748b" />
                              <span style={{ color:'#64748b', fontSize:'11px' }}>
                                {new Date(u.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {!u.isAdmin && (
                          <button
                            onClick={() => handleDeleteUser(u._id, u.username)}
                            style={{ background:'none', border:'none', color:'#f87171', cursor:'pointer', padding:'8px', flexShrink:0 }}
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SOS Logs Tab */}
              {activeTab === 'sos' && (
                <motion.div
                  key="sos"
                  initial={{ opacity:0, y:16 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-16 }}
                >
                  <div className="glass-card">
                    <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <h2 className="admin-title text-white font-bold text-base">All SOS Logs ({stats?.totalSOS || 0})</h2>
                    </div>
                    {stats?.recentSOS?.length === 0 ? (
                      <div style={{ padding:48, textAlign:'center' }}>
                        <AlertTriangle size={32} color="#374151" style={{ margin:'0 auto 12px' }} />
                        <p style={{ color:'#64748b', fontSize:14 }}>No SOS alerts triggered yet</p>
                      </div>
                    ) : (
                      stats?.recentSOS?.map((log, i) => (
                        <div key={log._id || i} className="sos-row">
                          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                              <div style={{ width:40,height:40,background:'rgba(239,68,68,0.1)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                                <AlertTriangle size={18} color="#f87171" />
                              </div>
                              <div>
                                <p style={{ color:'#e2e8f0', fontSize:'14px', fontWeight:600 }}>{log.user?.username || 'Unknown User'}</p>
                                <p style={{ color:'#64748b', fontSize:'12px' }}>{log.user?.email}</p>
                                <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:6 }}>
                                  <Clock size={11} color="#a78bfa" />
                                  <span style={{ color:'#94a3b8', fontSize:'11px' }}>
                                    {new Date(log.triggeredAt).toLocaleString()}
                                  </span>
                                </div>
                                {log.location && (
                                  <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:4 }}>
                                    <MapPin size={11} color="#a78bfa" />
                                    <a
                                      href={`https://www.google.com/maps/search/?api=1&query=${log.location.latitude},${log.location.longitude}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color:'#a78bfa', fontSize:'11px', textDecoration:'none' }}
                                    >
                                      View on Maps →
                                    </a>
                                  </div>
                                )}
                                <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:4 }}>
                                  <Users size={11} color="#64748b" />
                                  <span style={{ color:'#64748b', fontSize:'11px' }}>
                                    {log.contactsAlerted?.length || 0} contacts alerted
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${log.status === 'success' ? 'badge-success' : 'badge-failed'}`}>
                              {log.status === 'success' ? <span style={{display:'flex',alignItems:'center',gap:4}}><CheckCircle size={11}/> Sent</span> : <span style={{display:'flex',alignItems:'center',gap:4}}><XCircle size={11}/> Failed</span>}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
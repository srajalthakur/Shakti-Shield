import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '../../URL/Config';
import { Link } from 'react-router-dom';
import {
  Shield, Clock, MapPin, Users, AlertTriangle,
  ArrowLeft, CheckCircle, XCircle, Activity, Zap
} from 'lucide-react';

const Progress = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get(Config.GETSOSLOGSUrl, { withCredentials: true });
        setLogs(data.logs);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const successCount = logs.filter(l => l.status === 'success').length;
  const failedCount = logs.filter(l => l.status === 'failed').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e2e8f0',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '-150px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      {/* Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px', margin: '0 auto', padding: '24px 20px 100px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <Link to="/home" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa', textDecoration: 'none'
          }}>
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontSize: '22px',
              fontWeight: 700, margin: 0, color: '#f1f5f9',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <Shield size={20} color="#f59e0b" />
              SOS Activity
            </h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#475569', marginTop: '2px' }}>
              Your emergency alert history
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          <StatCard value={logs.length} label="Total" color="#a78bfa" icon={<Activity size={14} />} />
          <StatCard value={successCount} label="Sent" color="#34d399" icon={<CheckCircle size={14} />} />
          <StatCard value={failedCount} label="Failed" color="#f87171" icon={<XCircle size={14} />} />
        </div>

        {/* Success rate bar */}
        {logs.length > 0 && (
          <div style={{
            background: 'rgba(15,15,25,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', padding: '16px 20px',
            marginBottom: '24px', backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Success Rate</span>
              <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>
                {Math.round((successCount / logs.length) * 100)}%
              </span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(successCount / logs.length) * 100}%`,
                background: 'linear-gradient(90deg, #34d399, #10b981)',
                borderRadius: '99px',
                transition: 'width 1s ease'
              }} />
            </div>
          </div>
        )}

        {/* Log List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '3px solid rgba(124,58,237,0.3)', borderTopColor: '#a78bfa',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
            }} />
            <p style={{ color: '#475569', fontSize: '14px' }}>Loading activity...</p>
          </div>
        ) : logs.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 24px',
            background: 'rgba(15,15,25,0.6)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Zap size={28} color="#7c3aed" />
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#e2e8f0', margin: '0 0 8px' }}>
              No Alerts Yet
            </h3>
            <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
              Your SOS activity will appear here after you trigger an alert.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {logs.map((log, index) => (
              <LogCard key={log._id} log={log} number={logs.length - index} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ value, label, color, icon }) => (
  <div style={{
    background: 'rgba(15,15,25,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px', padding: '14px 12px',
    textAlign: 'center', backdropFilter: 'blur(20px)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color, marginBottom: '4px' }}>
      {icon}
    </div>
    <div style={{
      fontSize: '26px', fontWeight: 800,
      fontFamily: "'Syne', sans-serif",
      color, lineHeight: 1
    }}>
      {value}
    </div>
    <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
      {label}
    </div>
  </div>
);

const LogCard = ({ log, number }) => {
  const isSuccess = log.status === 'success';
  const date = new Date(log.triggeredAt);
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{
      background: 'rgba(15,15,25,0.8)',
      border: `1px solid ${isSuccess ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)'}`,
      borderRadius: '20px',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      animation: 'fadeSlideIn 0.3s ease both'
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '12px',
            background: isSuccess ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {isSuccess
              ? <CheckCircle size={16} color="#34d399" />
              : <XCircle size={16} color="#f87171" />
            }
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>
              Alert #{number}
            </div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '1px' }}>{dateStr}</div>
          </div>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 600,
          padding: '4px 10px', borderRadius: '99px',
          background: isSuccess ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
          color: isSuccess ? '#34d399' : '#f87171',
          border: `1px solid ${isSuccess ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
          textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>
          {log.status}
        </span>
      </div>

      {/* Details */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <DetailRow icon={<Clock size={13} color="#a78bfa" />} text={`${dateStr} at ${timeStr}`} />
        {log.location?.latitude && (
          <DetailRow
            icon={<MapPin size={13} color="#60a5fa" />}
            text={`${log.location.latitude.toFixed(4)}, ${log.location.longitude.toFixed(4)}`}
          />
        )}
        <DetailRow
          icon={<Users size={13} color="#34d399" />}
          text={`${log.contactsAlerted?.length || 0} contact${log.contactsAlerted?.length !== 1 ? 's' : ''} alerted`}
        />
      </div>
    </div>
  );
};

const DetailRow = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{
      width: '24px', height: '24px', borderRadius: '8px',
      background: 'rgba(255,255,255,0.04)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0
    }}>
      {icon}
    </div>
    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{text}</span>
  </div>
);

export default Progress;
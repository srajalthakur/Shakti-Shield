import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { Config } from '../../URL/Config';
import { AlertTriangle, ArrowLeft, Shield, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShaktiButton = () => {
  const { user } = useContext(AuthContext);
  const [phase, setPhase] = useState('idle'); // idle | confirming | sending | sent | failed
  const [ripple, setRipple] = useState(false);

  const handlePress = () => {
    if (phase === 'idle') {
      setPhase('confirming');
    }
  };

  const handleConfirm = () => {
    setPhase('sending');
    setRipple(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      setPhase('failed');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const contactNumbers = user?.contacts?.map(c => c.MobileNo);
        if (!contactNumbers || contactNumbers.length === 0) {
          toast.error("No emergency contacts added!");
          setPhase('idle');
          setRipple(false);
          return;
        }

        let smsStatus = "success";
        try {
          await axios.post(Config.EMERGENCYUrl, {
            contactNumbers,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }, { withCredentials: true });
        } catch (smsErr) {
          console.error("SMS failed:", smsErr.response?.data || smsErr.message);
          smsStatus = "failed";
        }

        await axios.post(Config.ADDSOSLOGUrl, {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          contactsAlerted: contactNumbers,
          status: smsStatus
        }, { withCredentials: true });

        setPhase(smsStatus === 'success' ? 'sent' : 'failed');
        toast.success(smsStatus === 'success' ? "Emergency alert sent!" : "SOS logged (SMS failed)");

        setTimeout(() => {
          setPhase('idle');
          setRipple(false);
        }, 4000);

      } catch (err) {
        console.error("SOS error:", err.response?.data || err.message);
        toast.error("Failed to send alert");
        setPhase('failed');
        setTimeout(() => { setPhase('idle'); setRipple(false); }, 3000);
      }
    }, () => {
      toast.error("Location access denied");
      setPhase('idle');
      setRipple(false);
    });
  };

  const handleCancel = () => setPhase('idle');

  const contactCount = user?.contacts?.length || 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      {/* Red glow when confirming/sending */}
      <div style={{
        position: 'fixed', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: phase === 'idle'
          ? 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)'
          : phase === 'sent'
            ? 'radial-gradient(ellipse, rgba(52,211,153,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)',
        transition: 'background 0.6s ease'
      }} />

      {/* Top bar */}
      <div style={{ position: 'relative', zIndex: 1, padding: '24px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/home" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
          color: '#a78bfa', textDecoration: 'none'
        }}>
          <ArrowLeft size={18} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Shield size={15} color="#f59e0b" />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>
            Shakti Shield
          </span>
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}>

        {/* Status text */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          {phase === 'idle' && (
            <>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, margin: '0 0 8px', color: '#f1f5f9' }}>
                Emergency Alert
              </h1>
              <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                Press the button to send an SOS<br />to your emergency contacts
              </p>
            </>
          )}
          {phase === 'confirming' && (
            <>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#fbbf24' }}>
                Confirm Alert?
              </h1>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
                This will alert {contactCount} contact{contactCount !== 1 ? 's' : ''} with your location
              </p>
            </>
          )}
          {phase === 'sending' && (
            <>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#ef4444' }}>
                Sending Alert...
              </h1>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Getting your location</p>
            </>
          )}
          {phase === 'sent' && (
            <>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#34d399' }}>
                Alert Sent!
              </h1>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
                Your contacts have been notified
              </p>
            </>
          )}
          {phase === 'failed' && (
            <>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#f87171' }}>
                Partially Failed
              </h1>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
                Alert logged but SMS may not have sent
              </p>
            </>
          )}
        </div>

        {/* THE BUTTON */}
        <div style={{ position: 'relative', marginBottom: '48px' }}>
          {/* Outer rings */}
          {(phase === 'idle' || phase === 'confirming') && (
            <>
              <div style={{
                position: 'absolute', inset: '-24px', borderRadius: '50%',
                border: '1px solid rgba(239,68,68,0.1)',
                animation: 'ringPulse 3s ease-in-out infinite'
              }} />
              <div style={{
                position: 'absolute', inset: '-48px', borderRadius: '50%',
                border: '1px solid rgba(239,68,68,0.06)',
                animation: 'ringPulse 3s ease-in-out infinite 0.5s'
              }} />
            </>
          )}

          {/* Ripple when sending */}
          {ripple && phase === 'sending' && (
            <>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(239,68,68,0.3)', animation: 'rippleOut 1.2s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', animation: 'rippleOut 1.2s ease-out infinite 0.4s' }} />
            </>
          )}

          {/* Main button */}
          <button
            onClick={phase === 'idle' ? handlePress : undefined}
            disabled={phase === 'sending' || phase === 'sent' || phase === 'failed'}
            style={{
              width: '180px', height: '180px', borderRadius: '50%',
              border: 'none', cursor: phase === 'idle' ? 'pointer' : 'default',
              position: 'relative', overflow: 'hidden',
              background: phase === 'sent'
                ? 'radial-gradient(circle at 35% 35%, #34d399, #059669)'
                : phase === 'sending'
                  ? 'radial-gradient(circle at 35% 35%, #f87171, #dc2626)'
                  : 'radial-gradient(circle at 35% 35%, #ef4444, #991b1b)',
              boxShadow: phase === 'sent'
                ? '0 0 60px rgba(52,211,153,0.5), 0 0 120px rgba(52,211,153,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 0 60px rgba(239,68,68,0.4), 0 0 120px rgba(239,68,68,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
              transform: phase === 'confirming' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {/* Inner shine */}
            <div style={{
              position: 'absolute', top: '10%', left: '15%',
              width: '35%', height: '35%', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', filter: 'blur(8px)'
            }} />

            {/* Icon */}
            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', height: '100%'
            }}>
              {phase === 'sending' ? (
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.4)', borderTopColor: 'white',
                  animation: 'spin 0.7s linear infinite', marginBottom: '8px'
                }} />
              ) : (
                <AlertTriangle
                  size={phase === 'sent' ? 40 : 44}
                  color="white"
                  strokeWidth={2.5}
                  style={{ marginBottom: '8px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                />
              )}
              <span style={{
                fontSize: '18px', fontWeight: 800,
                fontFamily: "'Syne', sans-serif",
                color: 'white', letterSpacing: '2px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {phase === 'sent' ? 'SENT' : phase === 'sending' ? '...' : 'SHAKTI'}
              </span>
            </div>
          </button>
        </div>

        {/* Confirm / Cancel actions */}
        {phase === 'confirming' && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '-24px', marginBottom: '24px' }}>
            <button onClick={handleConfirm} style={{
              padding: '14px 32px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              border: 'none', color: 'white', fontSize: '15px',
              fontWeight: 700, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 20px rgba(239,68,68,0.4)'
            }}>
              Send Now
            </button>
            <button onClick={handleCancel} style={{
              padding: '14px 24px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8', fontSize: '15px',
              fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Cancel
            </button>
          </div>
        )}

        {/* Info cards */}
        {(phase === 'idle' || phase === 'confirming') && (
          <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '340px' }}>
            <InfoCard icon={<Users size={14} color="#a78bfa" />} label="Contacts" value={contactCount} />
            <InfoCard icon={<MapPin size={14} color="#60a5fa" />} label="Location" value="GPS" />
            <InfoCard icon={<Shield size={14} color="#f59e0b" />} label="Status" value="Ready" color="#34d399" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        @keyframes rippleOut {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => (
  <div style={{
    flex: 1, background: 'rgba(15,15,25,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px', padding: '12px 10px',
    textAlign: 'center', backdropFilter: 'blur(20px)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{icon}</div>
    <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: color || '#e2e8f0' }}>
      {value}
    </div>
    <div style={{ fontSize: '10px', color: '#475569', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {label}
    </div>
  </div>
);

export default ShaktiButton;
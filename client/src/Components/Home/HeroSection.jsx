import { Link } from 'react-router-dom';
import { Shield, Zap, MapPin, Users, Bell, ChevronRight, Phone } from 'lucide-react';
import Testimony from './Testimony';

function HeroSection() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e2e8f0',
      overflowX: 'hidden'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Grid background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      {/* Top glow */}
      <div style={{
        position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '600px', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 65%)'
      }} />
      {/* Bottom right red glow */}
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-150px',
        width: '500px', height: '500px', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)'
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'rgba(8,8,16,0.85)',
        borderBottom: '1px solid rgba(124,58,237,0.12)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(124,58,237,0.5)'
          }}>
            <Shield size={18} color="white" />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '18px', color: '#f1f5f9' }}>
            Shakti<span style={{ color: '#a855f7' }}>Shield</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/login" style={{
            padding: '8px 18px', borderRadius: '10px',
            background: 'transparent', border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa', fontSize: '14px', fontWeight: 500,
            textDecoration: 'none'
          }}>Login</Link>
          <Link to="/signup" style={{
            padding: '8px 18px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            border: 'none', color: 'white', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(124,58,237,0.35)'
          }}>Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', padding: '80px 24px 60px',
        maxWidth: '680px', margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '99px', padding: '6px 14px', marginBottom: '28px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', animation: 'blink 2s infinite' }} />
          <span style={{ fontSize: '12px', color: '#a78bfa', fontWeight: 600, letterSpacing: '0.5px' }}>
            Your Personal Safety Companion
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(36px, 8vw, 64px)',
          fontWeight: 800, lineHeight: 1.1,
          margin: '0 0 20px', color: '#f1f5f9'
        }}>
          Stay Safe.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Stay Connected.</span>
        </h1>

        <p style={{
          fontSize: '17px', color: '#64748b', lineHeight: 1.7,
          margin: '0 0 36px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto'
        }}>
          One tap sends your live location to your emergency contacts instantly.
          Shakti Shield is your silent guardian, always ready.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: 'white', fontSize: '15px', fontWeight: 600,
            textDecoration: 'none', boxShadow: '0 4px 24px rgba(124,58,237,0.4)'
          }}>
            Start for Free <ChevronRight size={16} />
          </Link>
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', fontSize: '15px', fontWeight: 500,
            textDecoration: 'none'
          }}>Sign In</Link>
        </div>
      </section>

      {/* PHONE MOCKUP */}
      <section style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px 80px' }}>
        <div style={{
          width: '100%', maxWidth: '360px',
          background: 'rgba(12,12,22,0.9)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '32px', padding: '36px 24px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 80px rgba(124,58,237,0.12), 0 40px 80px rgba(0,0,0,0.5)',
          textAlign: 'center'
        }}>
          <div style={{ width: '80px', height: '6px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', margin: '0 auto 28px' }} />
          <p style={{ fontSize: '12px', color: '#475569', marginBottom: '20px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Emergency Alert
          </p>

          {/* Mock SOS Button */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
            <div style={{
              position: 'absolute', inset: '-20px', borderRadius: '50%',
              border: '1px solid rgba(239,68,68,0.15)',
              animation: 'ringPulse 3s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', inset: '-40px', borderRadius: '50%',
              border: '1px solid rgba(239,68,68,0.08)',
              animation: 'ringPulse 3s ease-in-out infinite 0.6s'
            }} />
            <div style={{
              width: '140px', height: '140px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #ef4444, #991b1b)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 50px rgba(239,68,68,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
            }}>
              <Shield size={36} color="white" strokeWidth={2.5} style={{ marginBottom: '6px' }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '14px', color: 'white', letterSpacing: '2px' }}>
                SHAKTI
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Mom', 'Dad', 'Sister'].map(name => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: '99px', padding: '4px 10px'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }} />
                <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 500 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 80px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, margin: '0 0 10px', color: '#f1f5f9' }}>
            Everything You Need
          </h2>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>Built for real emergencies</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <FeatureCard icon={<Zap size={20} color="#f59e0b" />} color="#f59e0b" title="One-Tap SOS" desc="Instant alert to all your emergency contacts with a single press." />
          <FeatureCard icon={<MapPin size={20} color="#60a5fa" />} color="#60a5fa" title="Live Location" desc="Shares your exact GPS coordinates in real time." />
          <FeatureCard icon={<Users size={20} color="#a78bfa" />} color="#a78bfa" title="Contact Groups" desc="Add multiple trusted contacts with photos and numbers." />
          <FeatureCard icon={<Bell size={20} color="#34d399" />} color="#34d399" title="SMS Alerts" desc="Contacts receive an SMS instantly — no app needed." />
          <FeatureCard icon={<Phone size={20} color="#f87171" />} color="#f87171" title="Activity Log" desc="Full history of every SOS alert you've triggered." />
          <FeatureCard icon={<Shield size={20} color="#c084fc" />} color="#c084fc" title="Secure Auth" desc="Google login + JWT — your data stays private." />
        </div>
      </section>

      {/* STATS */}
      <section style={{
        position: 'relative', zIndex: 1,
        margin: '0 auto 80px', maxWidth: '632px', padding: '0 24px'
      }}>
        <div style={{
          background: 'rgba(124,58,237,0.08)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '24px', padding: '32px 24px',
          backdropFilter: 'blur(20px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center'
        }}>
          <StatItem value="< 3s" label="Alert Time" />
          <StatItem value="100%" label="Free to Use" />
          <StatItem value="24/7" label="Always On" />
        </div>
      </section>

      {/* TESTIMONY SECTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 80px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, margin: '0 0 10px', color: '#f1f5f9' }}>
            Trusted by Users
          </h2>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>What people say about Shakti Shield</p>
        </div>
        <Testimony />
      </section>

      {/* CTA */}
      <section style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', padding: '0 24px 80px',
        maxWidth: '480px', margin: '0 auto'
      }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, margin: '0 0 12px', color: '#f1f5f9' }}>
          Ready to stay safe?
        </h2>
        <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 28px', lineHeight: 1.7 }}>
          Join thousands of people who trust Shakti Shield<br />as their personal safety net.
        </p>
        <Link to="/signup" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '16px 36px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
          color: 'white', fontSize: '16px', fontWeight: 700,
          textDecoration: 'none',
          boxShadow: '0 4px 32px rgba(124,58,237,0.45)',
          fontFamily: "'Syne', sans-serif"
        }}>
          Create Free Account <ChevronRight size={18} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '24px', textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Shield size={12} color="white" />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px', color: '#475569' }}>
            ShaktiShield
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#334155' }}>
          © 2025 Shakti Shield. Built with ❤️ for personal safety.
        </p>
      </footer>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}

const FeatureCard = ({ icon, color, title, desc }) => (
  <div style={{
    background: 'rgba(15,15,25,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '20px', padding: '20px 16px',
    backdropFilter: 'blur(20px)'
  }}>
    <div style={{
      width: '40px', height: '40px', borderRadius: '12px',
      background: `${color}15`, border: `1px solid ${color}25`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '12px'
    }}>
      {icon}
    </div>
    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', margin: '0 0 6px', color: '#f1f5f9' }}>
      {title}
    </h3>
    <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>{desc}</p>
  </div>
);

const StatItem = ({ value, label }) => (
  <div>
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, color: '#a855f7', lineHeight: 1 }}>
      {value}
    </div>
    <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {label}
    </div>
  </div>
);

export default HeroSection;
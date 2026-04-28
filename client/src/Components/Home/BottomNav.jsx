import { Home, Map, MessageSquare, User, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();
  const activePath = location.pathname;

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/map", icon: Map, label: "Map" },
    { path: "/reviews", icon: MessageSquare, label: "Reviews" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Bottom nav bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 16px 20px',
        background: 'linear-gradient(to top, rgba(8,8,16,1) 60%, transparent 100%)',
        pointerEvents: 'none'
      }}>
        <div style={{
          maxWidth: '480px', margin: '0 auto',
          background: 'rgba(14,14,24,0.95)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '24px',
          padding: '8px 12px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          pointerEvents: 'all'
        }}>
          {/* Left 2 items */}
          {navItems.slice(0, 2).map(item => (
            <NavItem key={item.path} item={item} active={activePath === item.path} />
          ))}

          {/* Center SOS button spacer */}
          <div style={{ width: '64px', flexShrink: 0 }} />

          {/* Right 2 items */}
          {navItems.slice(2).map(item => (
            <NavItem key={item.path} item={item} active={activePath === item.path} />
          ))}
        </div>
      </div>

      {/* Floating SOS button */}
      <div style={{
        position: 'fixed', bottom: '38px', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 51
      }}>
        <Link to="/sos" style={{ textDecoration: 'none' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Pulse rings */}
            <div style={{
              position: 'absolute', inset: '-8px', borderRadius: '50%',
              border: '1px solid rgba(239,68,68,0.25)',
              animation: 'sosRing 2.5s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', inset: '-16px', borderRadius: '50%',
              border: '1px solid rgba(239,68,68,0.12)',
              animation: 'sosRing 2.5s ease-in-out infinite 0.5s'
            }} />

            {/* Button */}
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: activePath === '/sos'
                ? 'radial-gradient(circle at 35% 35%, #f87171, #b91c1c)'
                : 'radial-gradient(circle at 35% 35%, #ef4444, #991b1b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(239,68,68,0.5), 0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Shield size={24} color="white" strokeWidth={2.5} />
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        @keyframes sosRing {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.06); }
        }
      `}</style>
    </>
  );
}

const NavItem = ({ item, active }) => (
  <Link to={item.path} style={{ textDecoration: 'none', flex: 1 }}>
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '4px', padding: '8px 4px',
      cursor: 'pointer'
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '13px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'rgba(124,58,237,0.2)' : 'transparent',
        border: active ? '1px solid rgba(124,58,237,0.35)' : '1px solid transparent',
        transition: 'all 0.2s ease',
        boxShadow: active ? '0 0 12px rgba(124,58,237,0.2)' : 'none'
      }}>
        <item.icon
          size={20}
          color={active ? '#a78bfa' : '#475569'}
          strokeWidth={active ? 2.5 : 2}
          style={{ transition: 'color 0.2s' }}
        />
      </div>
      <span style={{
        fontSize: '10px', fontWeight: active ? 600 : 400,
        color: active ? '#a78bfa' : '#475569',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.3px',
        transition: 'color 0.2s'
      }}>
        {item.label}
      </span>
    </div>
  </Link>
);

export default BottomNav;
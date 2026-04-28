function Loader() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(8,8,16,0.85)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

        {/* Spinner rings */}
        <div style={{ position: 'relative', width: '64px', height: '64px' }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid rgba(124,58,237,0.15)',
            borderTopColor: '#a855f7',
            animation: 'spin 1s linear infinite'
          }} />
          {/* Middle ring */}
          <div style={{
            position: 'absolute', inset: '10px', borderRadius: '50%',
            border: '2px solid rgba(168,85,247,0.1)',
            borderTopColor: '#7c3aed',
            animation: 'spin 0.7s linear infinite reverse'
          }} />
          {/* Inner dot */}
          <div style={{
            position: 'absolute', inset: '22px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            boxShadow: '0 0 12px rgba(124,58,237,0.6)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </div>

        {/* Text */}
        <span style={{
          fontSize: '12px', fontWeight: 600, color: '#475569',
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '1.5px', textTransform: 'uppercase'
        }}>
          Loading...
        </span>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
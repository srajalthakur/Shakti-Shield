import { Shield, Star, MapPin } from 'lucide-react';

const ReviewCard = ({ location, title, review, createdAt, username, rating = 5 }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(139,92,246,0.2)",
      borderRadius: "16px",
      padding: "24px",
      transition: "all 0.3s",
      backdropFilter: "blur(16px)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.border = "1px solid rgba(139,92,246,0.45)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.15)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.border = "1px solid rgba(139,92,246,0.2)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* Header — location + stars */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: "100px", padding: "4px 12px",
        }}
      >
        <MapPin size={13} style={{ color: "#a78bfa" }} />
        <span style={{ fontSize: "12px", color: "#a78bfa" }}>{location}</span>
      </div>

      <div style={{ display: "flex", gap: "2px" }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            style={{
              fill: i < rating ? "#facc15" : "transparent",
              color: i < rating ? "#facc15" : "#4b5563",
            }}
          />
        ))}
      </div>
    </div>

    {/* Title + review */}
    <h3 style={{ color: "#f1f5f9", fontWeight: "600", fontSize: "16px", marginBottom: "8px" }}>
      {title}
    </h3>
    <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.7", marginBottom: "20px" }}>
      {review}
    </p>

    {/* Footer — avatar + date */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: "700", fontSize: "14px",
          }}
        >
          {username?.charAt(0)?.toUpperCase() || "A"}
        </div>
        <div>
          <p style={{ color: "#e2e8f0", fontWeight: "500", fontSize: "13px", margin: 0 }}>
            {username || "Anonymous"}
          </p>
          <p style={{ color: "#6b7280", fontSize: "11px", margin: 0 }}>Shakti Shield User</p>
        </div>
      </div>

      <span style={{ color: "#6b7280", fontSize: "11px" }}>
        {new Date(createdAt).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric"
        })}
      </span>
    </div>
  </div>
);

export default ReviewCard;
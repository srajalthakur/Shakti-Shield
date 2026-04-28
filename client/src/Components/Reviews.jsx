import React, { useContext, useEffect, useState } from 'react';
import { Search, Plus, Star, X, MapPin } from 'lucide-react';
import BottomNav from './Home/BottomNav';
import { useForm } from 'react-hook-form';
import api from '../../URL/CustomApi';
import { Config } from '../../URL/Config';
import { AuthContext } from '../Context/AuthContext';
import Loader from './Home/Loader';

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(139,92,246,0.25)",
  color: "#e2e8f0",
  borderRadius: "12px",
  padding: "12px 16px",
  width: "100%",
  outline: "none",
  fontSize: "14px",
};

function Reviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const { handleSubmit, register, reset } = useForm();
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    api.get(Config.GETREVIEWSUrl)
      .then(res => {
        const fetched = res.data.reviews || [];
        setReviews(fetched);
        setAllReviews(fetched);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const applyFilter = (filter, source) => {
    if (filter === 'positive') return source.filter(r => r.rating >= 4);
    if (filter === 'critical') return source.filter(r => r.rating <= 2);
    return source;
  };

  const handleSearch = e => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    let filtered = applyFilter(activeFilter, allReviews);
    if (q) filtered = filtered.filter(r =>
      [r.title, r.review, r.location, r.user?.username].some(f => f?.toLowerCase().includes(q))
    );
    setReviews(filtered);
  };

  const handleFilterChange = filter => {
    setActiveFilter(filter);
    setReviews(applyFilter(filter, allReviews));
  };

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const res = await api.post(Config.ADDREVIEWUrl, { ...data, rating });
      if (res.status === 201) {
        setReviews(prev => [res.data.review, ...prev]);
        setAllReviews(prev => [res.data.review, ...prev]);
        setShowAddReview(false);
        reset();
        setRating(5);
      }
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const filterButtons = [
    { key: 'all',      label: 'All Reviews' },
    { key: 'positive', label: 'Positive'    },
    { key: 'critical', label: 'Critical'    },
  ];

  return (
    <div style={{ background: "#080810", minHeight: "100vh", paddingBottom: "96px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .rev-title { font-family: 'Syne', sans-serif; }
        .rev-body  { font-family: 'DM Sans', sans-serif; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .rev-input::placeholder { color: rgba(148,163,184,0.4); }
        .rev-input:focus {
          border-color: rgba(168,85,247,0.6) !important;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
        }
        .rev-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s;
        }
        .rev-card:hover {
          border-color: rgba(139,92,246,0.45);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.15);
        }
      `}</style>

      {/* Grid bg */}
      <div className="grid-bg" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      {/* Glow */}
      <div style={{
        position: "fixed", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)"
      }} />

      <div className="rev-body" style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "0 16px" }}>

        {/* Header */}
        <div style={{ paddingTop: "32px", paddingBottom: "24px", textAlign: "center" }}>
          <span style={{
            display: "inline-block", marginBottom: "12px",
            background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
            color: "#a78bfa", fontSize: "11px", letterSpacing: "2px",
            textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px"
          }}>Community</span>
          <h1 className="rev-title" style={{ color: "#fff", fontSize: "28px", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
            Safety Reviews
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
            Share experiences and read about safety in your community
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ marginBottom: "16px", position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
          <input
            className="rev-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by location, title or user..."
            style={{ ...inputStyle, paddingLeft: "40px", paddingRight: "100px" }}
          />
          <button
            type="submit"
            style={{
              position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", border: "none", borderRadius: "8px",
              padding: "6px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer"
            }}
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {filterButtons.map(f => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              style={{
                padding: "7px 16px", borderRadius: "100px", fontSize: "13px",
                fontWeight: "500", cursor: "pointer", transition: "all 0.2s", border: "none",
                background: activeFilter === f.key
                  ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                  : "rgba(255,255,255,0.06)",
                color: activeFilter === f.key ? "#fff" : "#9ca3af",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 className="rev-title" style={{ color: "#e2e8f0", fontSize: "16px", margin: 0 }}>
            {activeFilter === 'all' ? 'All Reviews' : activeFilter === 'positive' ? 'Positive Experiences' : 'Safety Concerns'}
            <span style={{ color: "#6b7280", fontWeight: "400", fontSize: "13px", marginLeft: "8px" }}>
              ({reviews.length})
            </span>
          </h2>
          <button
            onClick={() => setShowAddReview(true)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", border: "none", borderRadius: "10px",
              padding: "8px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer"
            }}
          >
            <Plus size={15} /> Add Review
          </button>
        </div>

        {/* Review cards */}
        {reviews.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {reviews.map(review => (
              <div key={review._id} className="rev-card">
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)",
                    borderRadius: "100px", padding: "3px 10px"
                  }}>
                    <MapPin size={12} style={{ color: "#a78bfa" }} />
                    <span style={{ color: "#a78bfa", fontSize: "12px" }}>{review.location}</span>
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} style={{
                        fill: i < review.rating ? "#facc15" : "transparent",
                        color: i < review.rating ? "#facc15" : "#4b5563"
                      }} />
                    ))}
                  </div>
                </div>

                <h3 style={{ color: "#f1f5f9", fontWeight: "600", fontSize: "15px", margin: "0 0 6px" }}>
                  {review.title}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.7", margin: "0 0 16px" }}>
                  {review.review}
                </p>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "700", fontSize: "13px"
                    }}>
                      {review.user?.username?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "500", margin: 0 }}>
                        {review.user?.username || 'Anonymous'}
                      </p>
                      <p style={{ color: "#6b7280", fontSize: "11px", margin: 0 }}>Shakti Shield User</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#6b7280", fontSize: "11px" }}>
                      {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {review.user?._id === user?._id && (
                      <button
                        onClick={async () => {
                          try {
                            await api.delete(Config.DELETEREVIEWUrl, { params: { reviewId: review._id } });
                            setReviews(prev => prev.filter(r => r._id !== review._id));
                            setAllReviews(prev => prev.filter(r => r._id !== review._id));
                          } catch (e) { console.error(e); }
                        }}
                        style={{
                          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                          borderRadius: "6px", padding: "3px 8px", color: "#f87171",
                          fontSize: "11px", cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "48px 24px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.15)",
            borderRadius: "16px"
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(124,58,237,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Star size={24} style={{ color: "#a78bfa" }} />
            </div>
            <p style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "16px", margin: "0 0 6px" }}>No reviews found</p>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 20px" }}>Be the first to share your safety experience</p>
            <button
              onClick={() => setShowAddReview(true)}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff", border: "none", borderRadius: "10px",
                padding: "10px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer"
              }}
            >
              Add Your Review
            </button>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReview && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(8,8,12,0.9)", backdropFilter: "blur(16px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "16px"
          }}
          onClick={e => e.target === e.currentTarget && setShowAddReview(false)}
        >
          <div style={{
            background: "rgba(18,18,26,0.98)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "24px", width: "100%", maxWidth: "480px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.15)"
          }}>
            <div style={{ padding: "28px" }}>
              {/* Modal header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <div>
                  <h2 className="rev-title" style={{ color: "#fff", fontSize: "20px", margin: "0 0 4px" }}>Share Your Experience</h2>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>Help others stay safe in your community</p>
                </div>
                <button
                  onClick={() => setShowAddReview(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.05)", color: "#9ca3af", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#9ca3af", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Location
                  </label>
                  <input
                    className="rev-input"
                    placeholder="Where did this happen?"
                    style={inputStyle}
                    {...register('location', { required: true })}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#9ca3af", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Title
                  </label>
                  <input
                    className="rev-input"
                    placeholder="Brief summary of your experience"
                    style={inputStyle}
                    {...register('title', { required: true })}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#9ca3af", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Rating
                  </label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        size={24}
                        style={{
                          cursor: "pointer",
                          fill: i <= (hoverRating || rating) ? "#facc15" : "transparent",
                          color: i <= (hoverRating || rating) ? "#facc15" : "#4b5563",
                          transition: "all 0.15s"
                        }}
                        onClick={() => setRating(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", color: "#9ca3af", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Your Experience
                  </label>
                  <textarea
                    className="rev-input"
                    rows={4}
                    placeholder="Share details about your safety experience..."
                    style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
                    {...register('review', { required: true })}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    style={{
                      flex: 1, padding: "12px", borderRadius: "12px", fontSize: "14px",
                      fontWeight: "500", cursor: "pointer",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "#9ca3af"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1, padding: "12px", borderRadius: "12px", fontSize: "14px",
                      fontWeight: "600", cursor: "pointer", border: "none",
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff"
                    }}
                  >
                    Share Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(8,8,12,0.8)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Loader />
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Reviews;
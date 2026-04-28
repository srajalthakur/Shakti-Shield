import React, { useEffect, useState } from "react";

const testimonials = [
  { name: "Alice Dorman",  role: "Student",      content: "Shakti Shield saved me when I felt unsafe. The SOS feature works instantly — I felt protected the whole time." },
  { name: "John Smith",    role: "Commuter",     content: "I love the community map. I always know where safe zones are nearby, which gives me real peace of mind." },
  { name: "Emma Wilson",   role: "Professional", content: "Managing emergency contacts is so easy and reassuring. Setup took under two minutes." },
  { name: "Michael Brown", role: "Parent",       content: "The usability and design make me feel protected at all times. Recommended it to my whole family." },
];

function Testimony() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = (idx) => {
    setCurrent(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent(prev => {
        setAnimKey(k => k + 1);
        return (prev + 1) % testimonials.length;
      });
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const t = testimonials[current];

  return (
    <section
      style={{ background: "#080810" }}
      className="relative overflow-hidden py-16 px-4"
    >
      {/* Purple glow orbs */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full pointer-events-none"
           style={{ background: "rgba(139,92,246,0.12)", filter: "blur(80px)" }} />
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full pointer-events-none"
           style={{ background: "rgba(109,40,217,0.10)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-xl mx-auto text-center">

        {/* Label */}
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
          Testimonials
        </span>

        <h2 className="text-3xl font-bold text-white mb-12" style={{ letterSpacing: "-0.5px" }}>
          What Our Users Say
        </h2>

        {/* Card */}
        <div
          key={animKey}
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(139,92,246,0.2)",
            animation: "fadeSlideUp 0.5s ease both",
          }}
        >
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            {t.name[0]}
          </div>

          <p className="text-lg leading-relaxed italic mb-6" style={{ color: "#e2e8f0" }}>
            "{t.content}"
          </p>

          <p className="font-semibold text-sm" style={{ color: "#a78bfa" }}>{t.name}</p>
          <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{t.role}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className="h-2 rounded-full transition-all duration-300 border-none"
              style={{
                width: idx === current ? "24px" : "8px",
                background: idx === current ? "#7c3aed" : "rgba(255,255,255,0.15)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Testimony;
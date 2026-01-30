"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoverPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [count, setCount] = useState(null);
  const [particles, setParticles] = useState([]);
const [showAngryPopup, setShowAngryPopup] = useState(false);

  useEffect(() => {
    // Generate floating particles for ambient effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  const startReveal = () => {
    setShowPopup(false);
    let num = 3;
    setCount(num);

    const music = new Audio("/music/love.mp3");
    music.volume = 0.6;
    music.play().catch(err => console.log("Audio playback failed:", err));

    const timer = setInterval(() => {
      num--;
      if (num === 0) {
        clearInterval(timer);
        router.push("/gallery");
      }
      setCount(num);
    }, 1000);
  };

  return (
    <main className="cover-container">
      {/* Animated background particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="content-wrapper">
        <div className="subtitle">Something Beautiful Awaits</div>
        
        <h1 className="main-title">
          A Moment Created
          <span className="title-accent">Just For You</span>
        </h1>

        <p className="romantic-message">
          Every heartbeat, every moment, every memory we've shared has led to this.
          Take a deep breath, and step into something extraordinary.
        </p>

        <button className="reveal-button" onClick={() => setShowPopup(true)}>
          <span className="button-text">Begin This Journey</span>
          <span className="button-icon">✨</span>
        </button>
      </div>
{showAngryPopup && (
  <div className="modal-overlay" onClick={() => setShowAngryPopup(false)}>
    <div
      className="modal-content angry"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src="/images/cute-angry.gif"
        alt="cute angry"
        className="angry-img"
      />

      <h3>Hmmph! 😤</h3>

      <p>
        I said I made something special for you…  
        Don’t keep me waiting too long 🥺💗
      </p>

      <button
        className="modal-btn primary"
        onClick={() => {
          setShowAngryPopup(false);
          setShowPopup(true);
        }}
      >
        Okay okay, I’m ready 💕
      </button>
    </div>
  </div>
)}

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">💝</div>
            <h3 className="modal-title">Are You Ready?</h3>
            <p className="modal-text">
              What comes next is something I've prepared with all my heart.
              Close your eyes for a moment, take a breath, and when you're ready...
            </p>
            <div className="modal-buttons">
             <button
  className="modal-btn secondary"
  onClick={() => {
    setShowPopup(false);
    setShowAngryPopup(true);
  }}
>
  Not Yet
</button>

              <button className="modal-btn primary" onClick={startReveal}>
                I'm Ready ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Countdown */}
      {count !== null && count > 0 && (
        <div className="countdown-overlay">
          <div className="countdown-number">{count}</div>
          <div className="countdown-text">Get ready...</div>
        </div>
      )}
    </main>
  );
}
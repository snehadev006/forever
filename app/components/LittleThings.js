"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LittleThingsPage() {

  useEffect(() => {
    const hearts = document.querySelectorAll(".floating-heart");
    hearts.forEach(h => {
      h.style.left = Math.random() * 100 + "vw";
      h.style.animationDuration = 6 + Math.random() * 6 + "s";
    });
  }, []);

  const router = useRouter();

  const cards = [
    {
      title: "Your Smile",
      text: "The way your eyes light up whenever you laugh makes my whole day brighter.",
      icon: "❤️",
    },
    {
      title: "Kindness",
      text: "You have the biggest heart I know, always thinking of others first.",
      icon: "✨",
    },
    {
      title: "Our Morning Coffee",
      text: "Even the simplest moments feel like magic when they're shared with you.",
      icon: "☕",
    },
    {
      title: "Your Passion",
      text: "Seeing you chase your dreams inspires me every single day.",
      icon: "🔥",
    },
    {
      title: "Your Music Taste",
      text: "The way you hum along makes every song sweeter.",
      icon: "🎵",
    },
    {
      title: "Safe Haven",
      text: "When the world gets loud, being in your arms is peace.",
      icon: "🏡",
    },
  ];

  return (
    <main className="love-bg text-center">

      {/* Floating hearts */}
      {[...Array(12)].map((_, i) => (
        <span key={i} className="floating-heart">💗</span>
      ))}

      <h1 className="love-title">
        Little Things I Love About You 💖
      </h1>
      <p className="love-subtitle">
        It's the small moments that make life with you so big.
      </p>

      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          {cards.map((c, i) => (
            <div key={i} className="col-lg-4 col-md-6 fade-card">
              <div className="love-card">
                <div className="love-icon">{c.icon}</div>
                <h5>{c.title}</h5>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="love-footer">
        And so many more things I could never fit on one page… 💕
      </p>

    <div className="romantic-btn-wrapper mt-5">

  <button
    className="romantic-next-btn"
    onClick={() => router.push("/message")}
  >
    <span className="heart-glow">💖</span>
    Continue Our Story
    <span className="sparkle">✨</span>
  </button>

</div>


    </main>
  );
}

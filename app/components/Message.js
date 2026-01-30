"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MessagePage() {
  const router = useRouter();
  const [showFuture, setShowFuture] = useState(false);

  useEffect(() => {
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach(h => {
      h.style.left = Math.random() * 100 + "vw";
      h.style.animationDuration = 8 + Math.random() * 6 + "s";
      h.style.fontSize = 12 + Math.random() * 14 + "px";
    });
  }, []);

  return (
    <main className="message-bg">

      {/* floating hearts */}
      {[...Array(14)].map((_, i) => (
        <span key={i} className="heart">💗</span>
      ))}

      {/* letter */}
      <div className="letter-card">

        <h1 className="letter-title">To My Forever Love,</h1>

        <p>
          Today is about celebrating the most beautiful person I know.  
          Every year with you feels like a new chapter in a story I never want to end.
        </p>

        <p>
          Your presence is my peace, your laughter is my favorite song,  
          and your love is the greatest gift I could ever receive.
        </p>

        <p>
          I wish for your day to be as radiant as your smile and as kind as your soul.  
          May this year bring you as much joy as you’ve brought into my life.
        </p>

        <div className="divider"></div>

        <button
          className="future-magic-btn"
          onClick={() => setShowFuture(true)}
        >
          <span className="future-heart">💖</span>
          Our Future Together
          <span className="future-sparkle">✨</span>
        </button>

        <h4 className="letter-sign mt-4">
          Always and forever, Me
        </h4>
      </div>

      {/* popup */}
      {showFuture && (
        <div
          className="future-overlay"
          onClick={() => setShowFuture(false)}
        >
          <div
            className="future-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close-btn"
              onClick={() => setShowFuture(false)}
            >
              ✕
            </span>

            <img
              src="/image-7.jpeg"
              alt="Our future"
              className="future-img"
            />

            <h3 className="future-title">
              Our Beautiful Future 💫
            </h3>

            <p className="future-sub">
              Forever starts with us…
            </p>
          </div>
        </div>
      )}

      {/* bottom nav */}
      <div className="bottom-pill">

        <span onClick={() => router.push("#")}>
          Home
        </span>

        <span onClick={() => router.push("/little-things")}>
          Little Things
        </span>

        <span onClick={() => router.push("/message")}>
          Message
        </span>

      </div>

    </main>
  );
}

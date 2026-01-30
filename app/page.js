"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalAudio } from "./components/GlobalAudio";

export default function LockPage() {
  const router = useRouter();
  const { playMusic } = useGlobalAudio();

  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const SECRET = "2909";

  useEffect(() => {
    const unlocked = localStorage.getItem("unlocked");
    if (unlocked === "true") {
      router.push("/home");
    }
  }, [router]);

  const press = (num) => {
    if (pin.length >= 4) return;

    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 4) {
      if (newPin === SECRET) {
        localStorage.setItem("unlocked", "true");

        setTimeout(() => {
          router.push("/home");
        }, 500);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin("");
        }, 500);
      }
    }
  };

  return (
    <div className="lock-bg">

      <div className={`heart-lock ${shake ? "shake" : ""}`}>
        {pin.length === 4 ? "💖" : "🔒"}
      </div>

      <div className="pin-dots">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={pin.length >= i ? "filled" : ""} />
        ))}
      </div>

      <div className="keypad">
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <button key={n} onClick={() => press(n)}>{n}</button>
        ))}

        <button onClick={() => setPin(pin.slice(0, -1))}>⌫</button>
        <button onClick={() => press(0)}>0</button>
        <button onClick={() => setPin("")}>✕</button>
      </div>

      <p className="hint">Enter our secret 💕</p>
    </div>
  );
}

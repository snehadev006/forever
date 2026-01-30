"use client";

import { createContext, useContext, useRef, useEffect } from "react";

const AudioContext = createContext(null);

export function GlobalAudioProvider({ children }) {
  const audioRef = useRef(null);

  const playMusic = () => {
    if (sessionStorage.getItem("musicStarted")) return;

    const audio = audioRef.current;
    if (!audio) return;

    const attemptPlay = () => {
      console.log('Attempting to play music');
      audio.volume = 0.6;
      audio.play().catch((error) => {
        console.error('Failed to play music:', error);
      });
      sessionStorage.setItem("musicStarted", "true");
    };

    if (audio.readyState >= 2) {
      attemptPlay();
    } else {
      const onCanPlay = () => {
        audio.removeEventListener('canplay', onCanPlay);
        attemptPlay();
      };
      audio.addEventListener('canplay', onCanPlay);
    }
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
  };

  return (
    <AudioContext.Provider value={{ playMusic, pauseMusic }}>
      <audio
        ref={audioRef}
        src="/music/love.mp3"
        preload="auto"
        loop
        onCanPlay={() => console.log('Audio loaded and can play')}
      />
      {children}
    </AudioContext.Provider>
  );
}

export const useGlobalAudio = () => useContext(AudioContext);

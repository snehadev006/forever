"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function BirthdayPage() {
  const images = [
    "/image-1.jpeg",
    "/image-2.jpeg",
    "/image-3.jpeg",
    "/image-4.jpeg",
    "/image-5.jpeg",
    "/image-6.jpeg",
  ];
  const router = useRouter();
  const galleryRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const boxes = gallery?.querySelectorAll('.gallery-box') || [];

    boxes.forEach((box, i) => {
      // Staggered reveal
      box.style.transitionDelay = `${i * 80}ms`;
      requestAnimationFrame(() => box.classList.add('reveal'));

      const img = box.querySelector('img');

      // Tilt / parallax on mouse move
      function onMove(e) {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateY = (x / rect.width) * 8;
        const rotateX = -(y / rect.height) * 8;
        box.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
        img.style.transform = `translateX(${x * 0.03}px) translateY(${y * 0.02}px) scale(1.04)`;
      }
      function onLeave() {
        box.style.transform = '';
        img.style.transform = '';
      }

      box.addEventListener('mousemove', onMove);
      box.addEventListener('mouseleave', onLeave);
      box._onMove = onMove;
      box._onLeave = onLeave;
    });

    // Particles background (subtle)
    const pWrap = particlesRef.current;
    const created = [];
    if (pWrap) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.bottom = `${-20 - Math.random() * 40}px`;
        p.style.animationDuration = `${6 + Math.random() * 8}s`;
        p.style.animationDelay = `${-Math.random() * 10}s`;
        p.style.width = `${6 + Math.random() * 10}px`;
        p.style.height = `${6 + Math.random() * 12}px`;
        pWrap.appendChild(p);
        created.push(p);
      }
    }

    return () => {
      boxes.forEach(box => {
        if (box._onMove) box.removeEventListener('mousemove', box._onMove);
        if (box._onLeave) box.removeEventListener('mouseleave', box._onLeave);
      });
      created.forEach(p => p.remove());
    };
  }, []);
  return (
    <main className="birthday-bg">

      {/* HERO */}
      <section className="text-center py-5">
        <h1 className="hero-title">Happy Birthday, Sham</h1>
        <p className="hero-quote">
          “The best thing to hold onto in life is each other.”
        </p>
        <button
      className="btn hero-btn"
      onClick={() => router.push("/little")}
    >
      click me🎉
    </button>
      </section>

      {/* GALLERY TITLE */}
      <div className="container text-center mb-4">
        <div className="d-flex align-items-center justify-content-center">
          <span className="title-line"></span>
          <h3 className="mx-3 gallery-title">Captured Memories</h3>
          <span className="title-line"></span>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div ref={particlesRef} className="particles-container" aria-hidden="true"></div>
      <section className="container" ref={galleryRef}>
        <div className="row g-4 justify-content-center">
          {images.map((img, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="gallery-box">
                <img src={img} alt={`Memory ${i + 1}`} />
                <div className="gallery-overlay">
                  <div className="overlay-text">Memory {i + 1}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

          

    </main>
  );
}

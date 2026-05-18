"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/gallery/salon-exterior-1.jpg",
    alt: "Kapsalon New Look Almere – buitenkant",
    caption: "Onze salon in Almere",
  },
  {
    src: "/gallery/salon-exterior-2.jpg",
    alt: "Kapsalon New Look Almere – gevel",
    caption: "7 Dagen per week open",
  },
  {
    src: "/gallery/salon-interior-1.jpg",
    alt: "Interieur New Look – premium kappersstoelen",
    caption: "Premium gouden kappersstoelen",
  },
  {
    src: "/gallery/salon-interior-2.jpg",
    alt: "Interieur New Look – overzicht salon",
    caption: "Ruime, luxe inrichting",
  },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + photos.length) % photos.length);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % photos.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Reset timer on manual navigation
  const navigate = (fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fn();
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % photos.length);
    }, 4000);
  };

  // Fade in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Onze Zaak
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Sfeer &{" "}
            <span className="text-gold-gradient">Interieur</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Een luxe, rustgevende omgeving waar jij je volledig op je gemak
            voelt. Goud, stijl en vakmanschap – dat is New Look.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Carousel */}
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-3xl overflow-hidden bg-[#111] border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(212,175,55,0.08)]">
            {/* Main image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
              ))}

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-16">
                <p className="text-white font-semibold text-lg drop-shadow-lg">
                  {photos[current].caption}
                </p>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">
                  New Look Kapsalon · Almere
                </p>
              </div>

              {/* Prev / Next buttons */}
              <button
                onClick={() => navigate(prev)}
                aria-label="Vorige foto"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigate(next)}
                aria-label="Volgende foto"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dot indicators + thumbnails */}
            <div className="bg-[#0f0f0f] px-6 py-4 flex items-center justify-between gap-4">
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {photos.map((photo, i) => (
                  <button
                    key={photo.src}
                    onClick={() => navigate(() => goTo(i))}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 border-2 ${
                      i === current
                        ? "border-[#D4AF37] opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`Ga naar foto ${i + 1}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>

              {/* Dots */}
              <div className="flex gap-1.5 flex-shrink-0">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(() => goTo(i))}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-[#D4AF37]"
                        : "w-2 h-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

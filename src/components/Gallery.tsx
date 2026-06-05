"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const carouselPhotos = [
  { src: "/gallery/salon-exterior-1.jpg", alt: "New Look Almere buitenkant", caption: "Onze salon in Almere" },
  { src: "/gallery/salon-exterior-2.jpg", alt: "New Look Almere gevel", caption: "7 Dagen per week open" },
  { src: "/gallery/salon-interior-1.jpg", alt: "Interieur kappersstoelen", caption: "Premium gouden kappersstoelen" },
  { src: "/gallery/salon-interior-2.jpg", alt: "Interieur overzicht", caption: "Ruime, luxe inrichting" },
];

const werkfotos = [
  { src: "/gallery/werk-1.jpg", alt: "Kapsel New Look – fade" },
  { src: "/gallery/werk-2.jpg", alt: "Kapsel New Look – pompadour fade" },
  { src: "/gallery/werk-3.jpg", alt: "Kapsel New Look – textured top" },
  { src: "/gallery/werk-4.jpg", alt: "Kapsel New Look – skin fade" },
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
      setCurrent((index + carouselPhotos.length) % carouselPhotos.length);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const resetAndNavigate = (fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fn();
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % carouselPhotos.length), 4500);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % carouselPhotos.length), 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
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
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">Onze Zaak & Werk</p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Sfeer & <span className="text-gold-gradient">Resultaten</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Bekijk onze luxe salon en een selectie van ons werk.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Salon carousel */}
        <div
          ref={sectionRef}
          className={`transition-all duration-700 mb-14 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">De salon</p>
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(212,175,55,0.06)]">
            {/* Main image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              {carouselPhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
                >
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="100vw" priority={i === 0} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
              ))}

              <div className="absolute bottom-6 left-6">
                <p className="text-white font-semibold text-lg drop-shadow-lg">{carouselPhotos[current].caption}</p>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">New Look Kapsalon · Almere</p>
              </div>

              <button onClick={() => resetAndNavigate(prev)} aria-label="Vorige" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => resetAndNavigate(next)} aria-label="Volgende" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Thumbnails + dots */}
            <div className="bg-[#0f0f0f] px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {carouselPhotos.map((photo, i) => (
                  <button key={photo.src} onClick={() => resetAndNavigate(() => goTo(i))} className={`relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 border-2 ${i === current ? "border-[#D4AF37] opacity-100" : "border-transparent opacity-40 hover:opacity-70"}`}>
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                {carouselPhotos.map((_, i) => (
                  <button key={i} onClick={() => resetAndNavigate(() => goTo(i))} className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-white/20 hover:bg-white/50"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Werk grid */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Ons werk</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {werkfotos.map((photo, i) => (
              <div key={photo.src} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-300">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-medium">New Look</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm italic">
              "Vakmanschap zit in elk detail."{" "}
              <span className="text-[#D4AF37]">– Hekmat Mezori</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

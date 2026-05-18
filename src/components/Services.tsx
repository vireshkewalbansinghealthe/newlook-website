"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  {
    icon: "✂",
    title: "Heren",
    items: [
      { name: "Alleen knippen", price: "€24" },
      { name: "Knippen + baard", price: "€35" },
      { name: "Gezicht behandeling", price: "v.a. €40" },
      { name: "Haar wassen", price: "+€3" },
    ],
  },
  {
    icon: "♛",
    title: "Dames",
    items: [
      { name: "Knippen – kort haar", price: "€28" },
      { name: "Knippen – lang haar", price: "€32" },
      { name: "Föhnen & stylen", price: "op aanvraag" },
      { name: "Haar wassen", price: "+€3" },
    ],
  },
  {
    icon: "★",
    title: "Kinderen",
    subtitle: "t/m 10 jaar",
    items: [
      { name: "Knippen (1–10 jaar)", price: "€20" },
      { name: "Haar wassen", price: "+€3" },
    ],
  },
];

const specialties = [
  { name: "Haren kleuren", desc: "Highlights, globaal of balayage" },
  { name: "Haar proteine behandeling", desc: "Versterkt & glanzend haar" },
  { name: "PRP behandeling", desc: "Tegen haaruitval, stimuleert groei" },
  { name: "Pruiken op maat", desc: "Maatwerk voor alopecia patiënten" },
  { name: "Baard trimmen & stylen", desc: "Nauwkeurig bijwerken" },
  { name: "Föhnen & stylen", desc: "Professionele finish" },
];

function PriceCategory({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Category header */}
      <div className="flex items-end gap-3 mb-6">
        <span className="text-[#D4AF37] text-2xl leading-none">{cat.icon}</span>
        <div>
          <h3 className="font-playfair text-2xl font-bold text-white leading-none">
            {cat.title}
          </h3>
          {cat.subtitle && (
            <span className="text-xs text-gray-500 tracking-widest uppercase">
              {cat.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent mb-6" />

      {/* Price rows */}
      <div className="space-y-4">
        {cat.items.map((item) => (
          <div key={item.name} className="flex items-baseline justify-between gap-3 group">
            <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200">
              {item.name}
            </span>
            <span className="flex-1 border-b border-dotted border-white/10 mb-1 mx-2" />
            <span className="text-[#D4AF37] font-bold text-sm whitespace-nowrap tabular-nums">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() =>
          document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
        }
        className="mt-8 w-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold py-3 rounded-xl text-xs uppercase tracking-widest transition-all duration-200"
      >
        Afspraak Maken
      </button>
    </div>
  );
}

export default function Services() {
  const specialRef = useRef<HTMLDivElement>(null);
  const [specialVisible, setSpecialVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpecialVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (specialRef.current) observer.observe(specialRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Tarieven
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Services &amp; <span className="text-gold-gradient">Prijzen</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Eerlijke, transparante tarieven. Geen verrassingen – gewoon topkwaliteit.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Price list grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#D4AF37]/15 rounded-2xl overflow-hidden">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`p-8 sm:p-10 ${
                i < categories.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[#D4AF37]/15"
                  : ""
              } ${i === 1 ? "bg-[#111]/80" : "bg-[#0d0d0d]"}`}
            >
              <PriceCategory cat={cat} index={i} />
            </div>
          ))}
        </div>

        {/* Specialistische behandelingen */}
        <div
          ref={specialRef}
          className={`mt-6 border border-[#D4AF37]/15 rounded-2xl overflow-hidden transition-all duration-700 ${
            specialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-[#0d0d0d] px-8 sm:px-10 py-6 border-b border-[#D4AF37]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-medium mb-1">
                Op aanvraag
              </p>
              <h3 className="font-playfair text-2xl font-bold text-white">
                Specialistische Behandelingen
              </h3>
            </div>
            <button
              onClick={() =>
                document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-shrink-0 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Neem Contact Op
            </button>
          </div>

          <div className="bg-[#111]/60 px-8 sm:px-10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((s) => (
              <div key={s.name} className="flex items-start gap-3 group">
                <div className="mt-0.5 w-4 h-4 shrink-0 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-200">
                    {s.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "Jaar Ervaring" },
  { value: "2000+", label: "Tevreden Klanten" },
  { value: "2", label: "Experts" },
  { value: "100%", label: "Tevredenheid" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left: text */}
          <div>
            <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
              Over ons
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Meer dan een kapper –{" "}
              <span className="text-gold-gradient">een ervaring</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mb-8" />

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                New Look Kapsalon Almere is opgericht door Hekmat Mizzouri met
                één doel: elke klant de beste kapperservaring bieden die hij
                verdient. In een stijlvolle, rustige omgeving zorgen onze
                kappers voor een persoonlijke behandeling.
              </p>
              <p>
                We geloven dat een goede knipbeurt meer is dan alleen haar
                knippen – het is een moment voor jou. Daarom nemen we de tijd
                om te luisteren naar jouw wensen en stijl.
              </p>
              <p>
                Naast de klassieke services bieden wij ook specialistische
                behandelingen zoals haarproteine en PRP-injecties voor
                haargroei aan, uitgevoerd met de nieuwste technieken.
              </p>
            </div>

            <button
              onClick={() =>
                document
                  .querySelector("#booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            >
              Maak een Afspraak
            </button>
          </div>

          {/* Right: stats + video snippet */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl p-6 text-center hover:border-[#D4AF37]/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-200"
                >
                  <p className="font-playfair text-4xl font-bold text-gold-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

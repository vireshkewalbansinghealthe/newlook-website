"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const team = [
  {
    name: "Hekmat Mizzouri",
    role: "Eigenaar & Oprichter",
    description:
      "Hekmat is de drijvende kracht achter New Look Kapsalon Almere. Met zijn passie voor het vak en jarenlange ervaring biedt hij elke klant een persoonlijke, kwalitatieve behandeling. Gespecialiseerd in klassieke herenkapsels en geavanceerde PRP haargroei behandelingen.",
    specialties: ["PRP Behandeling", "Klassiek knippen", "Haarproteine", "Alopecia"],
    photo: "/team/hekmat.jpg",
    initial: "H",
  },
  {
    name: "Mohamed",
    role: "Kapper",
    description:
      "Mohamed staat bekend om zijn nauwkeurige techniek en oog voor detail. Hij helpt klanten met uiteenlopende haarstylen en is gespecialiseerd in moderne kapsels en haarkleuringen.",
    specialties: ["Moderne stijlen", "Kleuren", "Föhnen & stylen", "Baard"],
    photo: null,
    initial: "M",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Leer ons kennen
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Ons <span className="text-gold-gradient">Team</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Twee ervaren kappers, één passie – jou er op je best laten uitzien.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#111] transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Gold top bar */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              {/* Photo area */}
              <div className="relative h-80 sm:h-96 bg-[#0d0d0d] overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-black text-6xl font-bold shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                      {member.initial}
                    </div>
                    <p className="text-gray-600 text-xs uppercase tracking-widest">Kapper</p>
                  </div>
                )}
                {/* Gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111] to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-[#D4AF37] text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {member.description}
                </p>

                {/* Specialties */}
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                    Specialiteiten
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book button */}
                <button
                  onClick={() =>
                    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-6 w-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all duration-200"
                >
                  Boek bij {member.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

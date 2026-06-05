"use client";

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative flex flex-col">
      {/* ── Full-screen video ── */}
      <div className="relative min-h-screen flex items-end overflow-hidden">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hekmat-hero.mp4" type="video/mp4" />
          <source src="/salon-video.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        {/* Left vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

        {/* Content – anchored to bottom-left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 pt-36 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

          {/* Left: main text */}
          <div className="max-w-xl">
            {/* Heading */}
            <h1 className="font-playfair font-bold leading-tight mb-6">
              <span className="block text-white text-4xl sm:text-5xl">
                Jouw Beste Look
              </span>
              <span className="block text-gold-gradient text-4xl sm:text-5xl">
                Begint Hier.
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Jouw haar verdient het beste. Van klassieke knipbeurten tot
              geavanceerde PRP haargroei behandelingen – 7 dagen per week voor
              je klaar.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+31642544898"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Bel Ons
              </a>
              <a
                href="https://maps.google.com/?q=Markerkant+263a+Almere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Route
              </a>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex flex-col items-center gap-1 z-10">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ── Gold info strip ── */}
      <div className="bg-[#D4AF37] py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-black text-xs font-bold uppercase tracking-widest">
          <span>Kapsalon New Look Almere</span>
          <span className="hidden sm:block opacity-40">·</span>
          <span>Markerkant 263a</span>
          <span className="hidden sm:block opacity-40">·</span>
          <span>06 42 54 48 98</span>
          <span className="hidden sm:block opacity-40">·</span>
          <span>7 Dagen · 10:00 – 18:00</span>
        </div>
      </div>
    </section>
  );
}

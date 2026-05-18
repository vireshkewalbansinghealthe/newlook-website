"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services & Prijzen", href: "#services" },
  { label: "Ons Team", href: "#team" },
  { label: "Galerij", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Over Ons", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const scrollTo = (href: string) => {
    setSidebarOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4" style={{ height: "72px" }}>

          {/* Brand name (left) */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex flex-col leading-none text-left"
          >
            <span className="font-playfair text-xl font-bold tracking-widest text-[#D4AF37] uppercase">
              New Look
            </span>
            <span className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">
              Kapsalon Almere
            </span>
          </button>

          {/* Desktop nav (center) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-xs text-gray-300 hover:text-[#D4AF37] transition-colors duration-200 tracking-widest uppercase font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: CTA + phone + hamburger */}
          <div className="flex items-center gap-3">
            {/* Afspraak Maken – always visible */}
            <button
              onClick={() => scrollTo("#booking")}
              className="bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold px-4 sm:px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-200 hover:shadow-[0_0_18px_rgba(212,175,55,0.5)] whitespace-nowrap"
            >
              Afspraak Maken
            </button>

            {/* Phone icon */}
            <a
              href="tel:+31642544898"
              aria-label="Bel ons"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>

            {/* Hamburger – always visible, opens sidebar */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Menu openen"
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 hover:border-[#D4AF37]/50 transition-colors duration-200"
            >
              <span className="block w-5 h-0.5 bg-[#D4AF37] rounded-full" />
              <span className="block w-4 h-0.5 bg-[#D4AF37] rounded-full self-start ml-2.5" />
              <span className="block w-5 h-0.5 bg-[#D4AF37] rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Sidebar overlay ── */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Sidebar drawer ── */}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] sm:w-[340px] z-[70] bg-[#0d0d0d] border-l border-[#D4AF37]/20 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] flex flex-col transition-transform duration-400 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionDuration: "350ms" }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#D4AF37]/15">
          <div>
            <p className="font-playfair text-lg font-bold text-[#D4AF37] tracking-widest uppercase">
              New Look
            </p>
            <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
              Kapsalon Almere
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Menu sluiten"
            className="w-9 h-9 rounded-full border border-white/15 hover:border-[#D4AF37]/60 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Gold line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-7 opacity-40" />

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 transition-all duration-200 group"
              style={{ transitionDelay: sidebarOpen ? `${i * 40}ms` : "0ms" }}
            >
              {/* Number indicator */}
              <span className="text-[10px] text-[#D4AF37]/40 group-hover:text-[#D4AF37] font-mono w-5 transition-colors">
                0{i + 1}
              </span>
              <span className="text-sm font-medium tracking-wide uppercase">
                {link.label}
              </span>
              <svg
                className="ml-auto w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-7 py-6 border-t border-[#D4AF37]/15 space-y-3">
          {/* Afspraak CTA */}
          <button
            onClick={() => scrollTo("#booking")}
            className="w-full bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold py-3.5 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Afspraak Maken
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/31642544898"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 border border-green-600/40 text-green-400 hover:bg-green-600/10 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Ons
          </a>

          {/* Contact info */}
          <div className="pt-2 space-y-1.5">
            <p className="text-xs text-gray-600 flex items-center gap-2">
              <span className="text-[#D4AF37]/60">📍</span>
              Markerkant 263a, Almere
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-2">
              <span className="text-[#D4AF37]/60">🕐</span>
              7 Dagen per week · 10:00 – 18:00
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

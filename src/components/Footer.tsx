"use client";

import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Ons Team", href: "#team" },
  { label: "Over Ons", href: "#about" },
  { label: "Afspraak Maken", href: "#booking" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-[#D4AF37]/15">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="New Look Kapsalon Almere"
              width={110}
              height={110}
              className="object-contain mb-4"
              style={{ mixBlendMode: "screen" }}
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium kapsalon in Almere. Professionele kappers met passie voor
              jouw haar.
            </p>
            {/* Social / WhatsApp */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/31642544898"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-600/20 border border-green-600/40 flex items-center justify-center text-green-400 hover:bg-green-600/30 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">
              Navigatie
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-6">
              Contact & Openingstijden
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-0.5">📍</span>
                <div>
                  <a
                    href="https://maps.google.com/?q=Markerkant+10+132D,+1316+AL+Almere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors leading-relaxed"
                  >
                    Markerkant 10 132D<br />1316 AL Almere
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#D4AF37]">📞</span>
                <a
                  href="tel:+31642544898"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  06 42 54 48 98
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#D4AF37]">✉️</span>
                <a
                  href="mailto:info@newlookalmere.nl"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  info@newlookalmere.nl
                </a>
              </li>
              <li className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Openingstijden
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">7 Dagen per week</span>
                    <span className="text-white font-semibold">10:00 – 18:00</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Google Maps embed */}
      <div className="border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-medium mb-1">
                Onze Locatie
              </p>
              <h3 className="text-white font-semibold text-lg">
                Markerkant 10 132D, 1316 AL Almere
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Markerkant+10+132D,+1316+AL+Almere"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 flex-shrink-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Open in Google Maps
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <iframe
              src="https://maps.google.com/maps?q=52.3877447,5.2196849&output=embed&z=17"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Look Kapsalon Almere – Markerkant 10 132D"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} New Look Kapsalon Almere. Alle rechten voorbehouden.</p>
          <p>
            Gemaakt met ❤️ voor{" "}
            <span className="text-[#D4AF37]">Hekmat Mizzouri</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

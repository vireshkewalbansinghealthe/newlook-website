"use client";

import { useEffect, useRef, useState } from "react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Kapsalon+New+Look+Almere+reviews&tbm=lcl";

const reviews = [
  {
    name: "Ahmed K.",
    rating: 5,
    date: "2 weken geleden",
    text: "Geweldige kapper! Hekmat luistert goed naar wat je wilt en levert altijd top kwaliteit. Ik kom hier al jaren en ga nergens anders heen.",
    initials: "AK",
  },
  {
    name: "Yusuf B.",
    rating: 5,
    date: "1 maand geleden",
    text: "Mohamed is echt een vakman. Knippen, baard trimmen – alles perfect. De sfeer in de zaak is ook geweldig, altijd een gezellige babbel.",
    initials: "YB",
  },
  {
    name: "Fatima S.",
    rating: 5,
    date: "3 weken geleden",
    text: "PRP behandeling gedaan bij Hekmat. Na een paar sessies zie ik echt verschil in mijn haargroei. Zeer professioneel en deskundig. Aanrader!",
    initials: "FS",
  },
  {
    name: "Rachid M.",
    rating: 5,
    date: "2 maanden geleden",
    text: "Beste kapsalon van Almere, geen discussie. Altijd on time, altijd kwaliteit. De gouden stoelen zeggen al genoeg – dit is een premium zaak.",
    initials: "RM",
  },
  {
    name: "Nadia V.",
    rating: 5,
    date: "1 maand geleden",
    text: "Haarproteine behandeling laten doen – mijn haar is zo zacht en glanzend. Super vriendelijk personeel en een prachtige salon. 10/10!",
    initials: "NV",
  },
  {
    name: "Omar H.",
    rating: 5,
    date: "3 maanden geleden",
    text: "Mijn zoon (6 jaar) was voor het eerst naar een kapper en hij was meteen op zijn gemak. Mohamed heeft geduld en zorgde voor een prachtig kapsel.",
    initials: "OH",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-[#FBBC04]" : "text-gray-600"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
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
      className={`bg-[#111] border border-white/8 rounded-2xl p-5 flex flex-col gap-4 hover:border-[#D4AF37]/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.07)] transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-black text-sm font-bold flex-shrink-0">
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{review.name}</p>
          <p className="text-gray-500 text-xs">{review.date}</p>
        </div>
        {/* Google G icon */}
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Text */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Wat klanten zeggen
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-6">
            Google <span className="text-gold-gradient">Reviews</span>
          </h2>

          {/* Overall rating badge */}
          <div className="inline-flex items-center gap-4 bg-[#1a1a1a] border border-[#D4AF37]/25 rounded-2xl px-6 py-4">
            <div className="text-center">
              <p className="text-5xl font-bold text-white leading-none">5.0</p>
              <div className="flex gap-0.5 mt-1.5 justify-center">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-4 h-4 text-[#FBBC04]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-1">op Google</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div>
                <p className="text-white font-semibold text-sm">Google Reviews</p>
                <p className="text-gray-500 text-xs">Kapsalon New Look Almere</p>
              </div>
            </div>
          </div>

          <div className="mt-8 w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Google CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Tevreden over jouw bezoek? Laat een review achter!
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-bold px-7 py-3.5 rounded-full text-sm transition-all duration-200 hover:shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Bekijk alle reviews op Google
          </a>
        </div>
      </div>
    </section>
  );
}

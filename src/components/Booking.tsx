"use client";

import { useState, FormEvent } from "react";

const barbers = ["Hekmat Mizzouri", "Mohamed", "Geen voorkeur"];

const services = [
  "Heren – alleen knippen (€24)",
  "Heren – knippen + baard (€35)",
  "Heren – gezicht behandeling (v.a. €40)",
  "Dames – knippen kort haar (€28)",
  "Dames – knippen lang haar (€32)",
  "Kinderen – knippen (€20)",
  "Haar wassen (+€3)",
  "Föhnen & stylen",
  "Haren kleuren",
  "Haar proteine behandeling",
  "PRP behandeling",
  "Pruiken op maat (alopecia)",
];

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00",
];

const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const MONTHS = [
  "Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "Juli", "Augustus", "September", "Oktober", "November", "December",
];

function Calendar({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1);
  // Monday-based: 0=Mon … 6=Sun
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const toISO = (d: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < today;

  // Build grid cells
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-2xl p-4 select-none">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full border border-white/10 hover:border-[#D4AF37]/50 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-semibold text-sm tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full border border-white/10 hover:border-[#D4AF37]/50 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] text-gray-600 uppercase tracking-widest py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const iso = toISO(day);
          const past = isPast(day);
          const isSelected = iso === selected;
          const isToday = iso === today.toISOString().split("T")[0];

          return (
            <button
              key={iso}
              type="button"
              disabled={past}
              onClick={() => onChange(iso)}
              className={`
                relative mx-auto w-9 h-9 rounded-full text-sm font-medium transition-all duration-150
                ${past ? "text-gray-700 cursor-not-allowed" : "cursor-pointer hover:bg-[#D4AF37]/15 hover:text-[#D4AF37]"}
                ${isSelected ? "bg-[#D4AF37] text-black hover:bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)]" : ""}
                ${isToday && !isSelected ? "border border-[#D4AF37]/40 text-[#D4AF37]" : ""}
                ${!isSelected && !isToday && !past ? "text-gray-300" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {selected && (
        <div className="mt-4 pt-3 border-t border-white/5 text-center">
          <span className="text-[#D4AF37] text-xs font-medium">
            ✓ {selected.split("-").reverse().join("-")} geselecteerd
          </span>
        </div>
      )}
    </div>
  );
}

type FormState = {
  name: string;
  phone: string;
  email: string;
  barber: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const initialForm: FormState = {
  name: "", phone: "", email: "", barber: "",
  service: "", date: "", time: "", message: "",
};

type Status = "idle" | "loading" | "success" | "error";

function InputField({ label, required, children }: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
        {label}{required && <span className="text-[#D4AF37] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 transition-colors duration-200 hover:border-white/20 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20";

export default function Booking() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleDateChange = async (date: string) => {
    setForm(prev => ({ ...prev, date, time: "" }));
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      setBookedSlots(data.bookedSlots ?? []);
    } catch {
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.date) { setError("Selecteer een datum in de agenda."); setStatus("error"); return; }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Er is iets misgegaan.");
      setStatus("success");
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Er is iets misgegaan. Probeer het opnieuw.");
    }
  };

  return (
    <section id="booking" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Reserveer jouw plek
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Afspraak <span className="text-gold-gradient">Maken</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Kies een datum in de agenda en wij bevestigen jouw afspraak zo snel mogelijk.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Form card */}
        <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-playfair text-3xl font-bold text-white mb-3">Afspraak Ontvangen!</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Bedankt! Je krijgt nu een mailtje van ons. Zodra we je afspraak bevestigen, laten we dat per mail weten.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-all duration-200"
              >
                Nieuwe Afspraak Maken
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="Naam" required>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Jouw volledige naam" className={inputClass} />
                </InputField>
                <InputField label="Telefoonnummer" required>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+31 6 00 00 00 00" className={inputClass} />
                </InputField>
              </div>

              {/* Email */}
              <InputField label="E-mailadres" required>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jouw@email.nl" className={inputClass} />
              </InputField>

              {/* Barber */}
              <InputField label="Kies jouw Kapper" required>
                <select name="barber" value={form.barber} onChange={handleChange} required className={inputClass}>
                  <option value="" disabled>Selecteer een kapper</option>
                  {barbers.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </InputField>

              {/* Service */}
              <InputField label="Service" required>
                <select name="service" value={form.service} onChange={handleChange} required className={inputClass}>
                  <option value="" disabled>Selecteer een behandeling</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </InputField>

              {/* Calendar */}
              <InputField label="Kies een Datum" required>
                <Calendar selected={form.date} onChange={handleDateChange} />
              </InputField>

              {/* Time slots */}
              <InputField label="Tijdstip" required>
                {loadingSlots ? (
                  <div className="flex items-center gap-2 text-gray-500 text-sm py-2">
                    <svg className="animate-spin w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Beschikbaarheid laden...
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map(t => {
                      const booked = bookedSlots.includes(t);
                      const selected = form.time === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={booked}
                          onClick={() => !booked && setForm(prev => ({ ...prev, time: t }))}
                          className={`py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                            booked
                              ? "bg-[#0f0f0f] border-white/5 text-gray-700 cursor-not-allowed line-through"
                              : selected
                              ? "bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                              : "bg-[#0f0f0f] border-white/10 text-gray-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
                {bookedSlots.length > 0 && !loadingSlots && (
                  <p className="text-xs text-gray-600 mt-2">Doorgestreepte tijden zijn al geboekt.</p>
                )}
                <input type="hidden" name="time" value={form.time} required />
              </InputField>

              {/* Message */}
              <InputField label="Extra Opmerkingen">
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Eventuele wensen of vragen..." className={inputClass + " resize-none"} />
              </InputField>

              {/* Error */}
              {status === "error" && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#D4AF37] hover:bg-[#F0D060] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Wordt verstuurd...
                  </>
                ) : "Afspraak Bevestigen"}
              </button>

              <p className="text-center text-xs text-gray-500">
                Wij nemen binnen 24 uur contact met je op ter bevestiging.
              </p>
            </form>
          )}
        </div>

        {/* WhatsApp */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-3">Liever direct contact? Stuur ons een WhatsApp bericht:</p>
          <a
            href="https://wa.me/31642544898?text=Hallo!%20Ik%20wil%20graag%20een%20afspraak%20maken%20bij%20New%20Look%20Kapsalon%20Almere."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-green-500/50 text-green-400 hover:bg-green-500/10 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Ons
          </a>
        </div>
      </div>
    </section>
  );
}

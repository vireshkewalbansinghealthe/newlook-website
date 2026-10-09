export type Afspraak = {
  name: string;
  email: string;
  barber: string;
  service: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
};

const ADRES = "Markerkant 10 132D, 1316 AL Almere";
const TELEFOON = "06 42 54 48 98";

// 12:00 UTC valt altijd binnen dezelfde Amsterdamse dag, ook in de winter.
function datumTekst({ date, time }: Afspraak) {
  const dag = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
  return `${dag} om ${time}`;
}

const teksten = {
  ontvangst: {
    subject: "We hebben je afspraak ontvangen",
    kop: "Afspraak ontvangen",
    intro: (a: Afspraak) =>
      `Hoi ${a.name}, bedankt voor je aanvraag. We kijken hem even na en je krijgt zo een bevestiging van ons.`,
    slot: "Let op: je afspraak staat pas vast zodra je onze bevestiging hebt ontvangen.",
  },
  bevestiging: {
    subject: "Je afspraak is bevestigd",
    kop: "Je afspraak is bevestigd",
    intro: (a: Afspraak) => `Hoi ${a.name}, je afspraak staat vast. Tot dan!`,
    slot: `Kun je niet? Bel ons even op ${TELEFOON}.`,
  },
};

export async function stuurMail(a: Afspraak, soort: keyof typeof teksten) {
  const t = teksten[soort];
  const salon = process.env.SALON_EMAIL;
  const regels = [
    ["Wanneer", datumTekst(a)],
    ["Kapper", a.barber],
    ["Service", a.service],
    ["Waar", ADRES],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;color:#111">
      <h2 style="color:#111">${t.kop}</h2>
      <p>${t.intro(a)}</p>
      <table style="border-collapse:collapse;margin:20px 0">
        ${regels
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><b>${v}</b></td></tr>`
          )
          .join("")}
      </table>
      <p style="color:#666;font-size:14px">${t.slot}</p>
      <p style="color:#666;font-size:14px">New Look Kapsalon Almere &middot; ${TELEFOON}</p>
    </div>`;

  const text = [t.kop, "", t.intro(a), "", ...regels.map(([k, v]) => `${k}: ${v}`), "", t.slot].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "New Look Kapsalon Almere <noreply@newlookalmere.nl>",
      to: [a.email],
      // De kapsalon krijgt een kopie van alles, en antwoorden van de klant
      // komen daar ook terecht (er wordt verstuurd vanaf een noreply-adres).
      ...(salon ? { bcc: [salon], reply_to: salon } : {}),
      subject: t.subject,
      text,
      html,
    }),
  });

  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

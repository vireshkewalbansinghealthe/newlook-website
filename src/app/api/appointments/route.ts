import { NextRequest, NextResponse } from "next/server";
import { getCalendar, CALENDAR_ID } from "@/lib/google-calendar";
import { stuurMail } from "@/lib/mail";
import { tekenEventId } from "@/lib/confirm-token";

type AppointmentData = {
  name: string;
  phone: string;
  email: string;
  barber: string;
  service: string;
  date: string;
  time: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: AppointmentData = await req.json();

    if (!data.name || !data.phone || !data.email || !data.barber || !data.service || !data.date || !data.time) {
      return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
    }

    const [year, month, day] = data.date.split("-").map(Number);
    const [hour, minute] = data.time.split(":").map(Number);

    // Kloktijd in Europe/Amsterdam. Zonder offset gebruikt Google het timeZone-veld,
    // zodat de serverklok (UTC op Vercel) de tijd niet verschuift.
    const pad = (n: number) => String(n).padStart(2, "0");
    const startLocal = `${data.date}T${pad(hour)}:${pad(minute)}:00`;
    const endParts = new Date(Date.UTC(year, month - 1, day, hour, minute) + 30 * 60 * 1000);
    const endLocal =
      `${endParts.getUTCFullYear()}-${pad(endParts.getUTCMonth() + 1)}-${pad(endParts.getUTCDate())}` +
      `T${pad(endParts.getUTCHours())}:${pad(endParts.getUTCMinutes())}:00`;

    const calendar = getCalendar();

    let eventId: string | null = null;
    let calendarOk = false;
    let notifyOk = false;

    // Google Calendar
    try {
      const inserted = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: {
          summary: `Nieuwe afspraak: ${data.service} - ${data.name}`,
          description: [
            `Klant: ${data.name}`,
            `Telefoon: ${data.phone}`,
            data.email ? `E-mail: ${data.email}` : "",
            `Kapper: ${data.barber}`,
            `Service: ${data.service}`,
            data.message ? `\nOpmerking: ${data.message}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
          start: { dateTime: startLocal, timeZone: "Europe/Amsterdam" },
          end: { dateTime: endLocal, timeZone: "Europe/Amsterdam" },
          colorId: "5",
          extendedProperties: {
            private: {
              klantNaam: data.name,
              klantEmail: data.email,
              klantKapper: data.barber,
              klantService: data.service,
            },
          },
        },
      });
      eventId = inserted.data.id ?? null;
      calendarOk = true;
    } catch (calErr: unknown) {
      const msg = calErr instanceof Error ? calErr.message : String(calErr);
      console.error("[calendar]", msg);
    }

    // Ontvangstbevestiging naar de klant. Niet fataal: de afspraak staat al genoteerd.
    try {
      await stuurMail(data, "ontvangst");
    } catch (mailErr) {
      console.error("[mail-ontvangst]", mailErr);
    }

    // Push notification via ntfy.sh – ASCII-only headers to avoid ByteString error
    const ntfyTopic = process.env.NTFY_TOPIC;
    if (ntfyTopic) {
      const dd = String(day).padStart(2, "0");
      const mm = String(month).padStart(2, "0");
      const body = [
        `Klant: ${data.name}`,
        `Tel: ${data.phone}`,
        `Kapper: ${data.barber}`,
        `Service: ${data.service}`,
        `Datum: ${dd}-${mm}-${year} om ${data.time}`,
        data.message ? `Opmerking: ${data.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      // JSON-formaat i.p.v. headers, want een emoji in een header is geen geldige ASCII.
      const siteUrl = process.env.SITE_URL ?? "https://www.newlookalmere.nl";
      const acties =
        eventId && process.env.CONFIRM_SECRET
          ? [
              {
                action: "http",
                label: "\u{1F44D} Bevestigen",
                url: `${siteUrl}/api/appointments/confirm?id=${encodeURIComponent(eventId)}&sig=${tekenEventId(eventId)}`,
                method: "POST",
              },
            ]
          : [];

      try {
        const res = await fetch("https://ntfy.sh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: ntfyTopic,
            title: "Nieuwe Afspraak - New Look Almere",
            message: body,
            priority: 4,
            tags: ["calendar", "scissors"],
            actions: acties,
          }),
        });
        notifyOk = res.ok;
        if (!res.ok) console.error("[ntfy]", res.status, await res.text());
      } catch (err) {
        console.error("[ntfy]", err);
      }
    } else {
      console.error("[ntfy] NTFY_TOPIC ontbreekt");
    }

    // Als geen van beide kanalen werkte is de afspraak nergens aangekomen.
    if (!calendarOk && !notifyOk) {
      return NextResponse.json(
        { error: "Kon afspraak niet vastleggen. Bel ons direct om je afspraak te bevestigen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Afspraak ontvangen." });
  } catch (err) {
    console.error("[appointments]", err);
    return NextResponse.json(
      { error: "Kon afspraak niet aanmaken. Probeer het opnieuw of bel ons direct." },
      { status: 500 }
    );
  }
}

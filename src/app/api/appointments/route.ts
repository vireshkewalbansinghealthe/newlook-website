import { NextRequest, NextResponse } from "next/server";
import { getCalendar, CALENDAR_ID } from "@/lib/google-calendar";

type AppointmentData = {
  name: string;
  phone: string;
  email?: string;
  barber: string;
  service: string;
  date: string;
  time: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: AppointmentData = await req.json();

    if (!data.name || !data.phone || !data.barber || !data.service || !data.date || !data.time) {
      return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
    }

    const [year, month, day] = data.date.split("-").map(Number);
    const [hour, minute] = data.time.split(":").map(Number);
    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const calendar = getCalendar();

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `✂️ ${data.service} – ${data.name}`,
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
        start: { dateTime: start.toISOString(), timeZone: "Europe/Amsterdam" },
        end: { dateTime: end.toISOString(), timeZone: "Europe/Amsterdam" },
        colorId: "5",
      },
    });

    return NextResponse.json({ success: true, message: "Afspraak aangemaakt in Google Calendar." });
  } catch (err) {
    console.error("[appointments]", err);
    return NextResponse.json(
      { error: "Kon afspraak niet aanmaken. Probeer het opnieuw of bel ons direct." },
      { status: 500 }
    );
  }
}

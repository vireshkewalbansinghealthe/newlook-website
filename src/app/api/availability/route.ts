import { NextRequest, NextResponse } from "next/server";
import { getCalendar, CALENDAR_ID } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date"); // "YYYY-MM-DD"
  if (!date) return NextResponse.json({ bookedSlots: [] });

  try {
    // Ruime marge rond de dag; de exacte dag wordt hieronder in Amsterdamse tijd gefilterd,
    // zodat zomer- en wintertijd allebei goed gaan.
    const utcMidnight = new Date(`${date}T00:00:00Z`).getTime();
    const timeMin = new Date(utcMidnight - 2 * 60 * 60 * 1000);
    const timeMax = new Date(utcMidnight + 26 * 60 * 60 * 1000);

    const calendar = getCalendar();
    const res = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
    });

    // Formatteren in Europe/Amsterdam i.p.v. de serverklok (UTC op Vercel).
    const dayFmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Amsterdam",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timeFmt = new Intl.DateTimeFormat("nl-NL", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const bookedSlots: string[] = [];
    for (const event of res.data.items ?? []) {
      const start = event.start?.dateTime;
      if (!start) continue;
      const d = new Date(start);
      if (dayFmt.format(d) !== date) continue;
      bookedSlots.push(timeFmt.format(d));
    }

    return NextResponse.json({ bookedSlots });
  } catch (err) {
    console.error("[availability]", err);
    return NextResponse.json({ bookedSlots: [] });
  }
}

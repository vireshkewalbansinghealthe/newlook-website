import { NextRequest, NextResponse } from "next/server";
import { getCalendar, CALENDAR_ID } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date"); // "YYYY-MM-DD"
  if (!date) return NextResponse.json({ bookedSlots: [] });

  try {
    const dayStart = new Date(`${date}T00:00:00+02:00`);
    const dayEnd = new Date(`${date}T23:59:59+02:00`);

    const calendar = getCalendar();
    const res = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
    });

    const bookedSlots: string[] = [];
    for (const event of res.data.items ?? []) {
      const start = event.start?.dateTime;
      if (!start) continue;
      const d = new Date(start);
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      bookedSlots.push(`${hh}:${mm}`);
    }

    return NextResponse.json({ bookedSlots });
  } catch (err) {
    console.error("[availability]", err);
    return NextResponse.json({ bookedSlots: [] });
  }
}

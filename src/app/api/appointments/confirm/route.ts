import { NextRequest, NextResponse } from "next/server";
import { getCalendar, CALENDAR_ID } from "@/lib/google-calendar";
import { handtekeningKlopt } from "@/lib/confirm-token";
import { stuurMail } from "@/lib/mail";

// Alleen POST: de knop in de ntfy-melding doet een POST, en zo kan een
// link-preview of crawler een afspraak niet per ongeluk bevestigen.
export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const sig = req.nextUrl.searchParams.get("sig");

  if (!id || !sig || !handtekeningKlopt(id, sig)) {
    return new NextResponse("Ongeldige bevestigingslink.", { status: 403 });
  }

  try {
    const calendar = getCalendar();
    const { data: event } = await calendar.events.get({ calendarId: CALENDAR_ID, eventId: id });

    if (event.summary?.startsWith("✅")) {
      return new NextResponse("Deze afspraak was al bevestigd.", { status: 200 });
    }

    const klant = event.extendedProperties?.private ?? {};
    const start = event.start?.dateTime;
    if (!klant.klantEmail || !start) {
      return new NextResponse("Geen klantgegevens bij deze afspraak.", { status: 422 });
    }

    const d = new Date(start);
    const inAmsterdam = (opties: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam", ...opties }).format(d);

    await stuurMail(
      {
        name: klant.klantNaam ?? "",
        email: klant.klantEmail,
        barber: klant.klantKapper ?? "",
        service: klant.klantService ?? "",
        date: inAmsterdam({ year: "numeric", month: "2-digit", day: "2-digit" }),
        time: inAmsterdam({ hour: "2-digit", minute: "2-digit", hour12: false }),
      },
      "bevestiging"
    );

    // Zichtbaar afvinken in de agenda, zodat Hekmat ziet wat al bevestigd is.
    await calendar.events.patch({
      calendarId: CALENDAR_ID,
      eventId: id,
      requestBody: { summary: `✅ ${event.summary ?? "Afspraak"}`, colorId: "10" },
    });

    return new NextResponse(`Bevestigd. ${klant.klantNaam ?? "De klant"} heeft een mail gekregen.`, {
      status: 200,
    });
  } catch (err) {
    console.error("[confirm]", err);
    return new NextResponse("Bevestigen mislukt. Probeer het opnieuw.", { status: 500 });
  }
}

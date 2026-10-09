import { createHmac, timingSafeEqual } from "node:crypto";

// Ondertekent het agenda-event-id, zodat de bevestig-link uit de push-melding
// niet door een buitenstaander te raden is. Er staan geen klantgegevens in.
export function tekenEventId(eventId: string) {
  const secret = process.env.CONFIRM_SECRET;
  if (!secret) throw new Error("CONFIRM_SECRET ontbreekt");
  return createHmac("sha256", secret).update(eventId).digest("hex");
}

export function handtekeningKlopt(eventId: string, handtekening: string) {
  const verwacht = Buffer.from(tekenEventId(eventId));
  const gegeven = Buffer.from(handtekening);
  return verwacht.length === gegeven.length && timingSafeEqual(verwacht, gegeven);
}

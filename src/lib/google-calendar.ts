import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export function getCalendar() {
  return google.calendar({ version: "v3", auth: getAuth() });
}

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID ?? "primary";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

function buildEmailHtml(data: AppointmentData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; background: #0f0f0f; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 32px; }
        .logo-text { color: #D4AF37; font-size: 24px; font-weight: bold; letter-spacing: 4px; }
        .subtitle { color: #aaaaaa; font-size: 12px; margin-top: 4px; }
        .card { background: #1a1a1a; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 32px; }
        .badge { display: inline-block; background: #D4AF37; color: #000; font-size: 11px; font-weight: bold; letter-spacing: 2px; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; text-transform: uppercase; }
        .title { font-size: 22px; font-weight: bold; color: #ffffff; margin-bottom: 24px; }
        .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .row:last-child { border-bottom: none; }
        .label { color: #888; font-size: 13px; }
        .value { color: #fff; font-size: 13px; font-weight: 600; text-align: right; max-width: 60%; }
        .message-box { background: rgba(255,255,255,0.04); border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #aaa; }
        .footer { text-align: center; margin-top: 32px; color: #555; font-size: 12px; }
        .gold { color: #D4AF37; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-text">NEW LOOK</div>
          <div class="subtitle">KAPSALON ALMERE</div>
        </div>
        <div class="card">
          <div class="badge">Nieuwe Afspraak</div>
          <div class="title">📅 Afspraakverzoek ontvangen</div>
          <div class="row">
            <span class="label">Naam</span>
            <span class="value">${data.name}</span>
          </div>
          <div class="row">
            <span class="label">Telefoonnummer</span>
            <span class="value">${data.phone}</span>
          </div>
          ${data.email ? `<div class="row"><span class="label">E-mail</span><span class="value">${data.email}</span></div>` : ""}
          <div class="row">
            <span class="label">Kapper</span>
            <span class="value gold">${data.barber}</span>
          </div>
          <div class="row">
            <span class="label">Service</span>
            <span class="value">${data.service}</span>
          </div>
          <div class="row">
            <span class="label">Datum</span>
            <span class="value">${formatDate(data.date)}</span>
          </div>
          <div class="row">
            <span class="label">Tijdstip</span>
            <span class="value">${data.time}</span>
          </div>
          ${
            data.message
              ? `<div class="message-box"><strong style="color:#D4AF37">Opmerking:</strong><br/>${data.message}</div>`
              : ""
          }
        </div>
        <div class="footer">
          Stuur een bevestiging naar de klant op ${data.phone}${data.email ? ` / ${data.email}` : ""}.
          <br/><br/>
          <span class="gold">New Look Kapsalon Almere</span> · automatisch gegenereerd
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildWhatsAppMessage(data: AppointmentData): string {
  return encodeURIComponent(
    `🗓 *Nieuwe Afspraak – New Look Almere*\n\n` +
      `👤 Naam: ${data.name}\n` +
      `📞 Telefoon: ${data.phone}\n` +
      `${data.email ? `✉️ Email: ${data.email}\n` : ""}` +
      `💈 Kapper: ${data.barber}\n` +
      `✂️ Service: ${data.service}\n` +
      `📅 Datum: ${formatDate(data.date)}\n` +
      `🕐 Tijdstip: ${data.time}\n` +
      `${data.message ? `\n💬 Opmerking: ${data.message}` : ""}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const data: AppointmentData = await req.json();

    // Basic validation
    if (!data.name || !data.phone || !data.barber || !data.service || !data.date || !data.time) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 }
      );
    }

    // --- Email via Nodemailer ---
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const recipientEmails = process.env.RECIPIENT_EMAILS?.split(",") ?? [];

    if (emailUser && emailPass && recipientEmails.length > 0) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: emailUser, pass: emailPass },
      });

      await transporter.sendMail({
        from: `"New Look Website" <${emailUser}>`,
        to: recipientEmails.join(", "),
        subject: `📅 Nieuwe Afspraak: ${data.name} – ${formatDate(data.date)} ${data.time}`,
        html: buildEmailHtml(data),
        text: `Nieuwe afspraak van ${data.name} (${data.phone}) op ${formatDate(data.date)} om ${data.time} bij ${data.barber} voor ${data.service}.`,
      });
    } else {
      console.warn("[appointments] Email env vars not set – email skipped.");
    }

    // --- WhatsApp webhook (for future OpenClaw agent) ---
    const whatsappWebhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
    if (whatsappWebhookUrl) {
      await fetch(whatsappWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_appointment",
          data,
          whatsapp_message: decodeURIComponent(buildWhatsAppMessage(data)),
        }),
      }).catch((err) => {
        console.error("[appointments] WhatsApp webhook failed:", err);
      });
    }

    // --- Fallback: WhatsApp direct link info in response ---
    const waNumber = process.env.WHATSAPP_NUMBER ?? "31600000000";
    const waLink = `https://wa.me/${waNumber}?text=${buildWhatsAppMessage(data)}`;

    return NextResponse.json({
      success: true,
      message: "Afspraak succesvol ontvangen.",
      whatsapp_link: waLink,
    });
  } catch (err) {
    console.error("[appointments] Error:", err);
    return NextResponse.json(
      { error: "Server fout. Probeer het opnieuw of bel ons direct." },
      { status: 500 }
    );
  }
}

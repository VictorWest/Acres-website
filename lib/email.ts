import "server-only";
import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY. Check .env.local against .env.example.");
  }
  return new Resend(apiKey);
}

export async function sendAttendeeConfirmationEmail({
  to,
  fullName,
  ticketPdf,
}: {
  to: string;
  fullName: string;
  ticketPdf: Buffer;
}) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
    <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #6b5b2e; font-weight: bold; margin: 0 0 8px;">ACRES 2026</p>
    <h1 style="font-size: 22px; margin: 0 0 16px;">You're registered, ${escapeHtml(fullName)} 🎉</h1>
    <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
      Thanks for registering for the African Construction and Real Estate Exhibition/Summit,
      12&ndash;14 November 2026, Obi Wali International Conference Centre, Port Harcourt.
    </p>
    <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
      Your entry ticket is attached to this email as a PDF, it has your QR
      code and entry code on it. Download it and bring it (digital or
      printed) to the gate for entry.
    </p>
    <p style="font-size: 12px; line-height: 1.6; color: #6b6b6b; margin: 0;">
      This pass grants access to the exhibition floor and general summit sessions.
      Gala/Awards Night access is by separate invitation or ticket.
    </p>
  </div>`;

  await resend.emails.send({
    from: `ACRES <${from}>`,
    to,
    subject: "Your ACRES 2026 registration is confirmed",
    html,
    attachments: [
      {
        filename: "ACRES-2026-Ticket.pdf",
        content: ticketPdf,
        contentType: "application/pdf",
      },
    ],
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

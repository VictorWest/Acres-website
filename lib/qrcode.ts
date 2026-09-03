import "server-only";
import QRCode from "qrcode";

const QR_OPTIONS = {
  errorCorrectionLevel: "M" as const,
  margin: 2,
  width: 320,
};

/**
 * Renders a QR code as a PNG buffer — used as an email attachment (see
 * lib/email.ts). Most mail clients (Gmail included) strip inline `data:` URI
 * images from <img src>, so the QR has to travel as a real attachment
 * referenced via `cid:`, not embedded directly in the HTML.
 */
export async function generateQrBuffer(content: string): Promise<Buffer> {
  return QRCode.toBuffer(content, QR_OPTIONS);
}

/**
 * Renders a QR code as a base64 PNG data URL — used for storage in the DB
 * (qr_data_url column) so the admin dashboard can display it without
 * regenerating the code.
 */
export async function generateQrDataUrl(content: string): Promise<string> {
  return QRCode.toDataURL(content, QR_OPTIONS);
}

/** The URL encoded into an attendee's QR — opens the gate check-in page. */
export function buildCheckInUrl(code: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/checkin/${code}`;
}

import "server-only";
import PDFDocument from "pdfkit";

const GOLD = "#8a6d1f";
const INK = "#1a1a1a";
const MUTED = "#6b6b6b";

/**
 * Builds a one-page attendee e-ticket: event details, the entry QR code, and
 * the fallback unique code. Sent as the email attachment — the email body
 * itself stays free of the QR/code and just points here.
 */
export async function generateAttendeeTicketPdf({
  fullName,
  uniqueCode,
  qrBuffer,
}: {
  fullName: string;
  uniqueCode: string;
  qrBuffer: Buffer;
}): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 56 });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  doc
    .fillColor(GOLD)
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("ACRES 2026", { characterSpacing: 2 });

  doc
    .fillColor(INK)
    .fontSize(22)
    .font("Helvetica-Bold")
    .moveDown(0.3)
    .text("Attendee Entry Ticket");

  doc
    .fillColor(MUTED)
    .fontSize(11)
    .font("Helvetica")
    .moveDown(0.6)
    .text(
      "African Construction and Real Estate Exhibition/Summit",
      { continued: false }
    )
    .text("12–14 November 2026")
    .text("Obi Wali International Conference Centre, Port Harcourt");

  doc.moveDown(1.2);
  doc
    .strokeColor("#e5e0d0")
    .lineWidth(1)
    .moveTo(doc.x, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke();

  doc.moveDown(1.2);
  doc.fillColor(MUTED).fontSize(10).font("Helvetica").text("REGISTERED TO");
  doc.fillColor(INK).fontSize(16).font("Helvetica-Bold").moveDown(0.2).text(fullName);

  doc.moveDown(1.5);
  const qrSize = 180;
  const qrX = (doc.page.width - qrSize) / 2;
  doc.image(qrBuffer, qrX, doc.y, { width: qrSize, height: qrSize });
  doc.y += qrSize + 16;

  doc
    .fillColor(MUTED)
    .fontSize(10)
    .font("Helvetica")
    .text("YOUR ENTRY CODE", { align: "center" });
  doc
    .fillColor(INK)
    .fontSize(20)
    .font("Helvetica-Bold")
    .moveDown(0.2)
    .text(uniqueCode, { align: "center", characterSpacing: 2 });

  doc.moveDown(1.5);
  doc
    .fillColor(MUTED)
    .fontSize(9)
    .font("Helvetica")
    .text(
      "Present this ticket (digital or printed) at the gate. This pass grants access to the exhibition floor and general summit sessions. Gala/Awards Night access is by separate invitation or ticket.",
      { align: "center" }
    );

  doc.end();
  return done;
}

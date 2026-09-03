import { NextResponse } from "next/server";
import { attendeeSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateUniqueCode } from "@/lib/codes";
import { buildCheckInUrl, generateQrBuffer, generateQrDataUrl } from "@/lib/qrcode";
import { generateAttendeeTicketPdf } from "@/lib/pdf";
import { sendAttendeeConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = attendeeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const supabase = createAdminClient();
  const uniqueCode = generateUniqueCode();
  const checkInUrl = buildCheckInUrl(uniqueCode);
  // Two renderings of the same QR: a data URL for DB storage/admin display,
  // and a raw PNG buffer to attach to the email (mail clients don't render
  // inline data: URI images reliably — see lib/email.ts).
  const [qrDataUrl, qrBuffer] = await Promise.all([
    generateQrDataUrl(checkInUrl),
    generateQrBuffer(checkInUrl),
  ]);

  const { error: insertError } = await supabase.from("attendees").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    country_city: data.countryCity || null,
    referral_source: data.referralSource || null,
    unique_code: uniqueCode,
    qr_data_url: qrDataUrl,
  });

  if (insertError) {
    console.error("attendee insert failed", insertError);
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please try again." },
      { status: 500 }
    );
  }

  try {
    const ticketPdf = await generateAttendeeTicketPdf({
      fullName: data.fullName,
      uniqueCode,
      qrBuffer,
    });
    await sendAttendeeConfirmationEmail({
      to: data.email,
      fullName: data.fullName,
      ticketPdf,
    });
  } catch (emailError) {
    // Registration is already saved — surface a softer message rather than
    // failing the whole request over a delivery problem.
    console.error("attendee confirmation email failed", emailError);
    return NextResponse.json({
      ok: true,
      code: uniqueCode,
      emailSent: false,
    });
  }

  return NextResponse.json({ ok: true, code: uniqueCode, emailSent: true });
}

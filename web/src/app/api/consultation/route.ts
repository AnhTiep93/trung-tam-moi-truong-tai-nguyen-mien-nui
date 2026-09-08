import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// Bộ nhớ tạm trong tiến trình — đủ dùng cho MVP một instance.
// Khi triển khai nhiều instance/serverless, thay bằng store dùng chung (Redis...).
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ConsultationPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  message?: string;
  serviceDocumentId?: string;
  website?: string; // honeypot
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let body: ConsultationPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 }
    );
  }

  // Honeypot: bot thường điền cả field ẩn này, người dùng thật sẽ để trống.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (
    fullName.length < 2 ||
    fullName.length > 200 ||
    !EMAIL_REGEX.test(email) ||
    message.length < 5 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/consultation-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          fullName,
          email,
          phone: body.phone?.trim()?.slice(0, 50) || undefined,
          organization: body.organization?.trim()?.slice(0, 200) || undefined,
          message,
          serviceInterest: body.serviceDocumentId || undefined,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Strapi responded ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 502 }
    );
  }
}

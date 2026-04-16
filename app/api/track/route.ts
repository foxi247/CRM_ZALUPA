import { NextRequest, NextResponse } from "next/server";
import { trackPageView } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    if (path) {
      const referrer = req.headers.get("referer") ?? undefined;
      const ua = req.headers.get("user-agent") ?? undefined;
      trackPageView(path, referrer, ua);
    }
  } catch { /* ignore */ }
  return NextResponse.json({ ok: true });
}

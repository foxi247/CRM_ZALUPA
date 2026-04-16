import { NextRequest, NextResponse } from "next/server";
import { getAllContentMeta, setContent } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAllContentMeta());
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    setContent(key, String(value));
  }
  return NextResponse.json({ ok: true });
}

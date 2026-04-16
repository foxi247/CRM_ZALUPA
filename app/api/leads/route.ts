import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();
  if (!email) return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
  createLead({ name, email, phone, message });
  return NextResponse.json({ ok: true });
}

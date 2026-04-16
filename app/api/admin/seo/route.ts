import { NextRequest, NextResponse } from "next/server";
import { getAllSeoSettings, setSeoSettings } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAllSeoSettings());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { path, ...data } = body;
  if (!path) return NextResponse.json({ error: "path обязателен" }, { status: 400 });
  setSeoSettings(path, data);
  return NextResponse.json({ ok: true });
}

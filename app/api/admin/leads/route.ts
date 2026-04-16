import { NextRequest, NextResponse } from "next/server";
import { getLeads, updateLeadStatus } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getLeads());
}

export async function PATCH(req: NextRequest) {
  const { id, status, notes } = await req.json();
  if (!id || !status) return NextResponse.json({ error: "id и status обязательны" }, { status: 400 });
  updateLeadStatus(Number(id), status, notes);
  return NextResponse.json({ ok: true });
}

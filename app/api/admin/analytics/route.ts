import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAnalytics());
}

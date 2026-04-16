import { NextResponse } from "next/server";
import { getAllSettings } from "@/lib/db";

export async function GET() {
  const s = getAllSettings();
  return NextResponse.json({
    primary:   s["theme.primary"]   ?? "#8ff5ff",
    secondary: s["theme.secondary"] ?? "#ac89ff",
    tertiary:  s["theme.tertiary"]  ?? "#f3ffca",
    surface:   s["theme.surface"]   ?? "#0e0e0e",
    preset:    s["theme.preset"]    ?? "default",
  });
}

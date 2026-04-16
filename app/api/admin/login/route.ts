import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminUser } from "@/lib/db";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 });
  }
  const user = getAdminUser(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
  }
  const token = await signToken({ sub: String(user.id), email: user.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(setSessionCookie(token));
  return res;
}

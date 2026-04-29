import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log("Login attempt for:", username);

    const envAdminUser = process.env.ADMIN_USERNAME || "puneet";
    const envAdminPass = process.env.ADMIN_PASSWORD || "123123";

    // Create admin if not exists (using ENV credentials)
    const existingUser = await prisma.user.findUnique({
      where: { username: envAdminUser },
    });

    if (!existingUser && username === envAdminUser) {
        console.log("Creating first-time admin user...");
        const hashedPassword = await bcrypt.hash(envAdminPass, 10);
        await prisma.user.create({
            data: {
                username: envAdminUser,
                password: hashedPassword,
                role: "ADMIN"
            }
        });
        console.log("Admin user created successfully.");
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
        console.log("User not found in DB:", username);
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (isPasswordValid) {
      const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const session = await encrypt({ user: { id: user.id, username: user.username, role: user.role }, expires });

      cookies().set("session", session, { expires, httpOnly: true });
      console.log("Login successful, session set.");
      return NextResponse.json({ success: true, role: user.role.toLowerCase() });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("CRITICAL Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

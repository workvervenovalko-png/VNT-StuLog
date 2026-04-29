import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";
import { routeAccessMap } from "./lib/settings";

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;

  // 1. Check if the path is a protected route
  const isProtected = Object.keys(routeAccessMap).some((route) =>
    path.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  // 2. If protected and no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Verify session and role
  try {
    const payload = await decrypt(session);
    const role = payload.user.role.toLowerCase();

    // Check if the role has access to the current path
    const allowedRoles = Object.entries(routeAccessMap).find(([route]) =>
      path.startsWith(route)
    )?.[1];

    if (allowedRoles && !allowedRoles.includes(role)) {
      // Redirect to their own dashboard if they don't have access
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

import { NextResponse } from "next/server";

export default function middleware(req) {
  const isAuthenticated = req.cookies.get("isAuthenticated");

  if (req.nextUrl.pathname === "/dashboard") {
    if (!isAuthenticated) {
      console.log("Redirecting to login page");
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      console.log("User is authenticated");
    }
  }

  return NextResponse.next();
}

import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

// protects routes
const middleware = async (req: NextRequest) => {
  const session = await getSession();
  console.log("session", session);

  if (!session?.user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/profile/:path*"],
};

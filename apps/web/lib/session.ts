"use server";

import config from "@/config";
import { Session } from "@/types";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const createSession = async (payload: Session) => {
  const expiredAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiredAt.getTime())
    .sign(new TextEncoder().encode(config.SESSION_SECRET_KEY));

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
};

export const getSession = async () => {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(
      session,
      new TextEncoder().encode(config.SESSION_SECRET_KEY),
      { algorithms: ["HS256"] }
    );
    return payload as unknown as Session;
  } catch (e) {
    console.error("Failed to verify cookies", e);
    redirect("/login", RedirectType.replace);
  }
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

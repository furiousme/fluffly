import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await deleteSession();

  revalidatePath("/");
  return NextResponse.redirect(new URL("/", req.nextUrl));
};

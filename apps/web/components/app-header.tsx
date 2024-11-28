import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

function AppHeader() {
  return (
    <header className="flex gap-2 justify-between p-4 items-center">
      <Link href="/" className="font-bold hover font-4xl uppercase">
        Fluffly
      </Link>
      <div className="flex gap-2">
        <Link
          href="/auth/signup"
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
        >
          Sign Up
        </Link>
        <Separator orientation="vertical" />
        <Link
          href="/auth/login"
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
        >
          Login
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;

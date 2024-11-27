"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import SubmitButton from "@/components/ui/submit-button";
import { useActionState } from "react";
import { loginAction } from "@/actions/login";

const LoginForm = () => {
  const [formState, action] = useActionState(loginAction, undefined);

  const emailErrors = formState?.errors?.email;
  const generalErrorMessage = formState?.message;

  return (
    <form action={action} className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      {!!generalErrorMessage && (
        <p className="text-sm text-red-600 text-center">
          {generalErrorMessage}
        </p>
      )}
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
            />
            {!!emailErrors?.length && (
              <p className="text-red-600 italic text-sm">{emailErrors[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" name="password" />
          </div>
          <SubmitButton className="w-full">Login</SubmitButton>
          <Button variant="outline" className="w-full">
            <Icons.google />
            Login with Google
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.gitHub />
            Login with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </form>
  );
};

export default LoginForm;

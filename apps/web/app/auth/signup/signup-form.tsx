"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { Label } from "@radix-ui/react-label";
import React, { useActionState } from "react";
import { signUpAction } from "@/actions/sign-up";

const SignUpForm = () => {
  const [formState, action] = useActionState(signUpAction, undefined);

  const emailErrors = formState?.errors?.email;
  const passwordErrors = formState?.errors?.password;
  const generalErrorMessage = formState?.message;

  return (
    <form action={action} className="grid gap-4" autoComplete="off">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          {!!generalErrorMessage && (
            <p className="text-sm text-red-600 text-center">
              {generalErrorMessage}
            </p>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub />
              GitHub
            </Button>
            <Button variant="outline">
              <Icons.google />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              autoComplete="off"
            />
            {!!emailErrors?.length && (
              <p className="text-red-600 italic text-sm">{emailErrors[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="off"
            />
            {!!passwordErrors?.length && (
              <p className="text-red-600 italic text-sm">{passwordErrors[0]}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full">Create account</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUpForm;

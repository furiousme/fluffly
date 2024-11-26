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
import React from "react";
import { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormInput, signUpFormSchema } from "@/lib/schemas";
import { signUpAction } from "@/actions/auth";
import { Form } from "@/components/ui/form";

const SignUpForm = () => {
  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFormSchema),
  });

  const emailErrorMessage = form.formState.errors?.email?.message;
  const passwordErrorMessage = form.formState.errors?.password?.message;

  const processForm: SubmitHandler<SignUpFormInput> = async (data) => {
    const result = await signUpAction(data);
    console.log({ result });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="grid gap-4">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
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
                placeholder="m@example.com"
                {...form.register("email")}
              />
              {emailErrorMessage && (
                <p className="text-red-600 italic text-sm">
                  {emailErrorMessage}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              {passwordErrorMessage && (
                <p className="text-red-600 italic text-sm">
                  {passwordErrorMessage}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton className="w-full">Create account</SubmitButton>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignUpForm;

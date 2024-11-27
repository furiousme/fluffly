import Link from "next/link";
import React from "react";
import SignUpForm from "./signup-form";

const SignUpPage = () => {
  return (
    <div className="lg:p-8 grow flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:w-[500px]">
        <SignUpForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import React, { PropsWithChildren } from "react";

interface SubmitButtonProps extends PropsWithChildren {
  className?: string;
}

function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className}>
      {pending ? "Loading..." : children}
    </Button>
  );
}

export default SubmitButton;

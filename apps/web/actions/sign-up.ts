"use server";

import config from "@/config";
import { SignUpFormSchema } from "@/lib/schemas";
import { FormState } from "@/types";
import { redirect } from "next/navigation";

export const signUpAction = async (
  _: FormState,
  formData: FormData
): Promise<FormState> => {
  const validationResult = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${config.API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationResult.data),
  });

  if (response.ok) {
    redirect("/auth/login");
  } else {
    return {
      message:
        response.status === 409 ? "User already exists." : response.statusText,
    };
  }
};

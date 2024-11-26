"use server";

import config from "@/config";
import { LoginFormSchema } from "@/lib/schemas";
import { FormState } from "@/types";
import { redirect } from "next/navigation";

export const loginAction = async (
  _: FormState,
  formData: FormData
): Promise<FormState> => {
  const validationResult = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    console.log(validationResult.error.flatten().fieldErrors);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${config.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationResult.data),
  });

  if (response.ok) {
    redirect("/profile");
  } else {
    return {
      message: response.statusText,
    };
  }
};

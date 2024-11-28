"use server";

import config from "@/config";
import { LoginFormSchema } from "@/lib/schemas";
import { createSession } from "@/lib/session";
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
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // todo: handle failures
  const response = await fetch(`${config.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationResult.data),
  });

  if (response.ok) {
    const userData = await response.json();
    createSession({
      user: {
        id: userData.id,
        email: userData.email,
      },
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    });
    redirect("/");
  } else {
    return {
      message: response.statusText,
    };
  }
};

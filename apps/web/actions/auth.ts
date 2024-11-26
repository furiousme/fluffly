"use server";

import { SignUpFormInput, signUpFormSchema } from "@/lib/schemas";

export const signUpAction = async (input: SignUpFormInput) => {
  const result = signUpFormSchema.safeParse(input);

  if (result.error) {
    return {
      success: false,
      error: result.error.format(),
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
};

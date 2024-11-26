import { z as zod } from "zod";

export const signUpFormSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .max(32),
});

export type SignUpFormInput = zod.infer<typeof signUpFormSchema>;

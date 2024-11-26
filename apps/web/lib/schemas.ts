import { z as zod } from "zod";

export const SignUpFormSchema = zod.object({
  email: zod.string().email().trim(),
  password: zod
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .max(32)
    .trim(),
});

export type SignUpFormInput = zod.infer<typeof SignUpFormSchema>;

export type FormState =
  | {
      message?: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

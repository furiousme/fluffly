export type FormState =
  | {
      message?: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export type Session = {
  user: {
    id: number;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type Page = "sign-in" | "sign-up" | "account";

export type SetPage = (page: Page) => void;

export type AuthProps = {
  setEmail: (email: string) => void;
  email: string;
  setPassword: (password: string) => void;
  password: string;
  loading: boolean;
  setPage?: SetPage;
  handleSignIn?: () => Promise<void>;
  handleSignUp?: () => Promise<void>;
};

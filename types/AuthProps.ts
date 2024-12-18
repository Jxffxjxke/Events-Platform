export type Page = "sign-in" | "sign-up" | "account";

export type SetPage = (page: Page) => void;

export type UserType = "admin" | "user" | null;

export type SetUserType = (userType: UserType) => void;

export type AuthProps = {
  username?: string;
  setUsername?: (usernmame: string) => void;
  setEmail: (email: string) => void;
  email: string;
  setPassword: (password: string) => void;
  password: string;
  loading: boolean;
  setPage?: SetPage;
  handleSignIn?: () => Promise<void>;
  handleSignUp?: () => Promise<void>;
};

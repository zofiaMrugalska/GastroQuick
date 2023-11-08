export interface SignInInterface {
  name: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  email: string;
  confirmPassword: string;
}

export interface AuthorInterface {
  name: string;
  email: string;
  id: string;
}

export interface LoginResponseInterface {
  data: {
    accessToken: string;
    user: AuthorInterface;
  };
  message: string;
  success: boolean;
}

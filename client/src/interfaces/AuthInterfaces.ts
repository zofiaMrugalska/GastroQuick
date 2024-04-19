export interface SignInInterface {
  name: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  email: string;
  confirmPassword: string;
}

export interface VerifyFormInterface {
  verificationCode: string;
}

export interface VerifyInterface {
  verificationCode: string;
  verificationToken: string;
}

export interface AuthorInterface {
  name: string;
  email: string;
  id: string;
}

export interface RegisterResponseInterface {
  data: {
    user: AuthorInterface;
  };
  message: string;
  success: boolean;
}

export interface VerifyResponseInterface {
  data: {
    user: AuthorInterface;
    isVerified: boolean;
  };
  message: string;
  success: boolean;
}

export interface LoginResponseInterface {
  data: {
    accessToken: string;
    user: AuthorInterface;
  };
  message: string;
  success: boolean;
}

export interface ResendCodeResponseInterface {
  data: null;
  message: string;
  success: boolean;
}

export type ResetPasswordResponseInterface = ResendCodeResponseInterface;

export type SetNewPasswordResponseInterface = ResendCodeResponseInterface;

export interface SetNewPasswordFormInterface {
  resetPasswordVerificationCode: string;
  newPassword: string;
}

export interface SetNewPasswordInterface {
  resetPasswordToken: string;
  resetPasswordVerificationCode: string;
  newPassword: string;
}

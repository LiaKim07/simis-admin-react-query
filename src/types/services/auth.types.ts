export interface LoginDto {
  username: string;
  password: string;
}

export interface ResetPasswordDto {
  username: string;
  newpassword: string;
  confirmpassword: string;
}

export interface ChangePasswordDto {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface LoginRes {
  token: string;
  expiration: number;
}

export interface ForgotPasswordInfo {
  username: string;
}

export interface IChangePassword {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IResetPassword {
  username: string;
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

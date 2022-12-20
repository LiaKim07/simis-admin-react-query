import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import {
  ForgotPasswordInfo,
  IChangePassword,
  IResetPassword,
  LoginDto,
  LoginRes,
} from '../../types/services/auth.types';

class AuthenticatorService {
  public async login(loginInfo: LoginDto): Promise<AxiosResponse<LoginRes>> {
    return await customAxios.post('/authenticate/login', loginInfo);
  }

  public async logout() {
    return await customAxios.get('/authenticate/logout');
  }

  public async changePassword(changePassword: IChangePassword) {
    console.log('change password data', changePassword)
    return await customAxios.post('/authenticate/change-password', changePassword);
  }

  public async forgotPassword(initiateResetPassword: ForgotPasswordInfo) {
    return await customAxios.post(
      '/authenticate/reset-password-token',
      initiateResetPassword,
    );
  }
  public async resetPassword(resetPassword: any) {
    return await customAxios.post('/authenticate/reset-password', resetPassword);
  }
}

export const authService = new AuthenticatorService();

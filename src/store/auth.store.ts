import { useMutation, useQuery } from 'react-query';

import { authService } from '../services/auth/auth.service';

class AuthenticatorStore {
  login() {
    return useMutation(authService.login);
  }
  logout() {
    return useQuery('logout', authService.logout, { enabled: false });
  }
  passwordChange() {
    return useMutation(authService.changePassword);
  }
  resetPassword() {
    return useMutation(authService.resetPassword);
  }
  forgotPassword() {
    return useMutation(authService.forgotPassword);
  }
}

export const authStore = new AuthenticatorStore();

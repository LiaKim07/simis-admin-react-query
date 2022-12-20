import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IUser } from '../../types/services/user.types';
import { ICreateUser } from "../../types/interface";

class UserService {
  public async fetchCurrentUser(): Promise<AxiosResponse<any>> {
    return await customAxios.get('/users/current-user');
  }

  public async create(
    user: any
  ): Promise<AxiosResponse<any>> {
    return await customAxios.post(`/users/register`, user);
  }

  public async getrole(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/users/roles");
  }

  public async fetchAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/users");
  }

  public async fetchById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/users/${id}`);
  }
}

export const userService = new UserService();

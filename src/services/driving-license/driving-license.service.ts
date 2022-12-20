import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmployeeRole } from '../../types/services/employees.types';

class DrivingLicenseService {
  public async create(
    data: any,
  ): Promise<AxiosResponse<any>> {
    return await customAxios.post('/driving-license-categories', data);
  }

  public async getAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get('/driving-license-categories');
  }

  public async getById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/driving-license-categories/${id}`);
  }

  public async update(
    employeeRole: any
  ): Promise<AxiosResponse<any>> {
    return await customAxios.put(`/driving-license-categories/${employeeRole.id}`, employeeRole);
  }

  public async removeById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/driving-license-categories/${id}`);
  }
}

export const drivingLicenseService = new DrivingLicenseService();

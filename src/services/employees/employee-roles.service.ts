import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICreateEmployeeRole, IEmployeeRole, IUpdateEmployeeRole } from '../../types/services/employees.types';

class EmployeeRolesService {
  public async createRole(
    data: ICreateEmployeeRole,
  ): Promise<AxiosResponse<any>> {
    return await customAxios.post('/employee-roles', data);
  }

  public async getAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get('/employee-roles');
  }

  public async getById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/employee-roles/${id}`);
  }
  public async update(
    employeeRole: IUpdateEmployeeRole
  ): Promise<AxiosResponse<IEmployeeRole>> {
    return await customAxios.put(`/employee-roles/${employeeRole.id}`, employeeRole);
  }

  public async removeById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/employee-roles/${id}`);
  }
}

export const employeeRolesService = new EmployeeRolesService();

import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmploymentTypeInfo } from '../../types/services/employees.types';

class EmploymentType {
  public async getAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get('/employment-types');
  }

  public async getById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.post(`/employment-types/${id}`);
  }
}

export const employmentTypeService = new EmploymentType();

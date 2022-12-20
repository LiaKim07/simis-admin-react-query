import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmployeeRole } from '../../types/services/employees.types';

class EmploymentTerm {
  public async getAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get('/employment-terms');
  }

  public async getById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.post(`employment-terms/${id}`);
  }
}

export const employmentTermService = new EmploymentTerm();

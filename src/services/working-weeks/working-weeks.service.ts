import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmploymentTypeInfo } from '../../types/services/employees.types';

class WorkingWeeks {
  public async getAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get('/working-week-types');
  }

  public async getById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.post(`/working-week-types/${id}`);
  }
}

export const workingWeeksService = new WorkingWeeks();

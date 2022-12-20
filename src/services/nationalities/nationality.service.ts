import { AxiosResponse } from 'axios';
import { customAxios } from '../../plugins/axios';
import { INationality } from '../../types/services/nationalities.types';

class NationalityService {
  public async fetchAll(): Promise<AxiosResponse<any>> {console.log('fetch')
    return await customAxios.get('/employee-nationalities');
  }

  public async fetchById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/employee-nationalities/${id}`);
  }

}

export const nationalityService = new NationalityService();

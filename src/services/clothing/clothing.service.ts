import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IClothingInfo } from '../../types/services/employees.types';

class ClothingService {
  public async getAll(): Promise<AxiosResponse<IClothingInfo[]>> {
    return await customAxios.get('/clothings');
  }

  public async getById(id: string): Promise<AxiosResponse<IClothingInfo>> {
    return await customAxios.post(`/clothings/${id}`);
  }
}

export const clothingService = new ClothingService();

import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IClothingType } from '../../types/services/employees.types';

class ClothingTypesService {
  public async getAll(): Promise<AxiosResponse<IClothingType[]>> {
    return await customAxios.get('/clothing-types');
  }

  public async getById(id: string): Promise<AxiosResponse<IClothingType>> {
    return await customAxios.post(`/clothing-types/${id}`);
  }
}

export const clothingTypesService = new ClothingTypesService();

import { useQuery } from 'react-query';

import { clothingTypesService } from '../services/clothing/clothing-types.service';

class ClothingTypStore {
  getAll() {
    return useQuery(['clothing-types'], () => clothingTypesService.getAll());
  }
  getById(id?: string) {
    return useQuery(
      ['clothing-types', id],
      () => clothingTypesService.getById(id || ''),
      {
        enabled: !!id,
      },
    );
  }
}

export const clothingTypeStore = new ClothingTypStore();

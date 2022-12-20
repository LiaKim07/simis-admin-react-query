import { useQuery } from 'react-query';

import { clothingService } from '../services/clothing/clothing.service';

class ClothingStore {
  getAll() {
    return useQuery(['clothings'], () => clothingService.getAll());
  }
  getById(id?: string) {
    return useQuery(['employment-types', id], () => clothingService.getById(id || ''), {
      enabled: !!id,
    });
  }
}

export const clothingStore = new ClothingStore();

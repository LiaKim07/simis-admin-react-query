import { useQuery } from 'react-query';

import { nationalityService } from '../services/nationalities/nationality.service';

class NationalityStore {
  getAll() {
    return useQuery(['nationalities'], () => nationalityService.fetchAll());
  }

  getById(id: string) {
    return useQuery(['nationalityById'], () => nationalityService.fetchById(id));
  }
}

export const nationalityStore = new NationalityStore();

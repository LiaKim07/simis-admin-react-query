import { useQuery } from 'react-query';

import { workingWeeksService } from '../services/working-weeks/working-weeks.service';

class WorkingWeek {
  getAll() {
    return useQuery(['working-weeks'], () => workingWeeksService.getAll());
  }
  getById(id?: string) {
    return useQuery(['working-weeks', id], () => workingWeeksService.getById(id || ''), {
      enabled: !!id,
    });
  }
}

export const workingWeekStore = new WorkingWeek();

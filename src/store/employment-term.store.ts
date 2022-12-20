import { useQuery } from 'react-query';

import { employmentTermService } from '../services/employees/employment-terms.service';

class EmploymentTerm {
  getAll() {
    return useQuery(['employment-terms'], () => employmentTermService.getAll());
  }
  getById(id?: string) {
    return useQuery(
      ['employment-terms', id],
      () => employmentTermService.getById(id || ''),
      {
        enabled: !!id,
      },
    );
  }
}

export const employmentTermStore = new EmploymentTerm();

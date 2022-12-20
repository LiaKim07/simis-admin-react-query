import { useQuery } from 'react-query';

import { employmentTypeService } from '../services/employees/employment-types.service';

class EmploymentType {
  getAll() {
    return useQuery(['employment-types'], () => employmentTypeService.getAll());
  }
  getById(id?: string) {
    return useQuery(
      ['employment-types', id],
      () => employmentTypeService.getById(id || ''),
      {
        enabled: !!id,
      },
    );
  }
}

export const employmentTypeStore = new EmploymentType();

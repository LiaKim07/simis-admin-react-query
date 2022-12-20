import { useMutation, useQuery } from 'react-query';

import { employeeRolesService } from '../services/employees/employee-roles.service';

class EmployeeRole {
  create() {
    return useMutation(employeeRolesService.createRole);
  }
  
  getAll() {
    return useQuery(['employees-roles'], () => employeeRolesService.getAll());
  }

  getById(id?: string) {
    return useQuery(
      ['employee-rolesID', id],
      () => employeeRolesService.getById(id || ''),
      {
        enabled: !!id,
      },
    );
  }

  update() {
    return useMutation(employeeRolesService.update);
  }

  removeById() {
    return useMutation(employeeRolesService.removeById);
  }
}

export const employeeRoleStore = new EmployeeRole();

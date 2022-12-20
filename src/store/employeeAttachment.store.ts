import { useMutation, useQuery } from 'react-query';

import { employeeAttachmentService } from '../services/employees/employeeAttachement.service';

class EmployeeAttachmentStore {
    create() {
        return useMutation(employeeAttachmentService.create);
    }

    getAll() {
        return useQuery(['employeeAttachment'], () => employeeAttachmentService.getAll());
    }

    // getById(id?: string) {
    //     return useQuery(
    //         ['company-contractsId', id],
    //         () => companyContractService.getById(id || ''),
    //         {
    //             enabled: !!id,
    //         },
    //     );
    // }

    update() {
        return useMutation(employeeAttachmentService.update);
    }

    removeById() {
        return useMutation(employeeAttachmentService.removeById);
    }
}

export const employeeAttachmentStore = new EmployeeAttachmentStore();

import { useMutation, useQuery } from 'react-query';

import { companyService } from '../services/company/company.service';

class CompanyStore {
    create() {
        return useMutation(companyService.create);
    }

    getAll() {
        return useQuery(['company-profile'], () => companyService.getAll());
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
        return useMutation(companyService.update);
    }

    removeById() {
        return useMutation(companyService.removeById);
    }
}

export const companyStore = new CompanyStore();

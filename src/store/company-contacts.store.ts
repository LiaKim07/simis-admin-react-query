import { useMutation, useQuery } from 'react-query';

import { companyContactsService } from '../services/company-contract/company-contacts.service';

class CompanyContacts {
    create() {
        return useMutation(companyContactsService.create);
    }

    getAll() {
        return useQuery(['company-contacts'], () => companyContactsService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['company-contactsId', id],
            () => companyContactsService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(companyContactsService.update);
    }

    removeById() {
        return useMutation(companyContactsService.removeById);
    }
}

export const companyContacts = new CompanyContacts();

import { useQuery } from 'react-query';

import { customerStatusesService } from '../services/customer/customer-statuses.service';

class CustomerstatusesStore {
    getAll() {
        return useQuery(['customerstatuses'], () => customerStatusesService.getAll());
    }
    getById(id?: string) {
        return useQuery(['customerstatusesById', id], () => customerStatusesService.getById(id || ''), {
            enabled: !!id,
        });
    }
}

export const customerstatusesStore = new CustomerstatusesStore();

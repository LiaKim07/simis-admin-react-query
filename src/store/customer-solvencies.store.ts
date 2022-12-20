import { useQuery } from 'react-query';

import { customerSolvenciesService } from '../services/customer/customer-solvencies.service';

class CustomersolvenciesStore {
    getAll() {
        return useQuery(['customersolvencies'], () => customerSolvenciesService.getAll());
    }
    getById(id?: string) {
        return useQuery(['customersolvenciesById', id], () => customerSolvenciesService.getById(id || ''), {
            enabled: !!id,
        });
    }
}

export const customersolvenciesStore = new CustomersolvenciesStore();

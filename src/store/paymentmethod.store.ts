import { useQuery } from 'react-query';

import { customerStatusesService } from '../services/customer/customer-statuses.service';

class PaymentmethodStore {
    getAll() {
        return useQuery(['paymentmethods'], () => customerStatusesService.getAll());
    }
    getById(id?: string) {
        return useQuery(['paymentmethodsById', id], () => customerStatusesService.getById(id || ''), {
            enabled: !!id,
        });
    }
}

export const paymentmethodStore = new PaymentmethodStore();

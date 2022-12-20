import { useMutation, useQuery } from 'react-query';

import { invoiceDetailsService } from '../services/invoice/invoice-details.service';

class InvoiceDetailsStore {
    create() {
        return useMutation(invoiceDetailsService.create);
    }

    getAll() {
        return useQuery(['invoice-details'], () => invoiceDetailsService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['invoice-detailsById', id],
            () => invoiceDetailsService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(invoiceDetailsService.update);
    }

    removeById() {
        return useMutation(invoiceDetailsService.removeById);
    }
}

export const invoiceDetailsStore = new InvoiceDetailsStore();

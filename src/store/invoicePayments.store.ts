import { useMutation, useQuery } from 'react-query';

import { invoicePaymentsService } from '../services/invoice/invoicePayments.service';

class InvoicePaymentsStore {
    create() {
        return useMutation(invoicePaymentsService.create);
    }

    getAll() {
        return useQuery(['invoicePayment'], () => invoicePaymentsService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['invoicePaymentsById', id],
            () => invoicePaymentsService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(invoicePaymentsService.update);
    }

    removeById() {
        return useMutation(invoicePaymentsService.removeById);
    }
}

export const invoicePaymentsStore = new InvoicePaymentsStore();

import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';

class InvoicePaymentsService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/invoice-payments', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/invoice-payments');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/invoice-payments/${id}`);
    }
    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/invoice-payments/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/invoice-payments/${id}`);
    }
}

export const invoicePaymentsService = new InvoicePaymentsService();

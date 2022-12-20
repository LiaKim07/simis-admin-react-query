import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';

class InvoiceDetailsService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/invoice-details', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/invoice-details');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/invoice-details/${id}`);
    }
    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/invoice-details/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/invoice-details/${id}`);
    }
}

export const invoiceDetailsService = new InvoiceDetailsService();

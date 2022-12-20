import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmployeeRole } from '../../types/services/employees.types';

class EcommreceOrderService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/ecommerce-orders', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/ecommerce-orders');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/ecommerce-orders/${id}`);
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/ecommerce-orders/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/ecommerce-orders/${id}`);
    }
}

export const ecommreceOrderService = new EcommreceOrderService();

import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmployeeRole } from '../../types/services/employees.types';

class EcommreceClientService {
    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/ecommerce-customers');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/ecommerce-customers/${id}`);
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/ecommerce-customers/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/ecommerce-customers/${id}`);
    }
}

export const ecommreceClientService = new EcommreceClientService();

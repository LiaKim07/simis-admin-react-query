import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICreateEmployeeRole, IEmployeeRole, IUpdateEmployeeRole } from '../../types/services/employees.types';

class CompanyContactsService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/company-contacts', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/company-contacts');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/company-contacts/${id}`);
    }
    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/company-contacts/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/company-contacts/${id}`);
    }
}

export const companyContactsService = new CompanyContactsService();

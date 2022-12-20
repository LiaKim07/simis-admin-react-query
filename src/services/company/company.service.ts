import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICreateEmployeeRole, IEmployeeRole, IUpdateEmployeeRole } from '../../types/services/employees.types';

class CompanyService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/company-profile', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/company-profile');
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        console.log('submit data', data)
        return await customAxios.put(`/company-profile/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/company-profile/${id}`);
    }
}

export const companyService = new CompanyService();

import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICreateEmployeeRole, IEmployeeRole, IUpdateEmployeeRole } from '../../types/services/employees.types';

class AgreementClausesService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/agreement-clauses', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/agreement-clauses');
    }
    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/agreement-clauses/${id}`);
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        console.log('submit data', data)
        return await customAxios.put(`/agreement-clauses/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/agreement-clauses/${id}`);
    }
}

export const agreementClausesService = new AgreementClausesService();

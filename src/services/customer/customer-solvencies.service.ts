import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICustomerSolvenciesInfo } from '../../types/services/clients.type';

class CustomerSolvenciesService {
    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/customer-settings?type=solvency');
    }

    public async getById(id: string): Promise<AxiosResponse<ICustomerSolvenciesInfo>> {
        return await customAxios.post(`/customer-solvencies/${id}`);
    }
}

export const customerSolvenciesService = new CustomerSolvenciesService();

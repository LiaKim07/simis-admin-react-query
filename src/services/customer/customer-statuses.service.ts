import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICustomerStatusesInfo } from '../../types/services/clients.type';

class CustomerStatusesService {
    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/customer-settings?type=status');
    }

    public async getById(id: string): Promise<AxiosResponse<ICustomerStatusesInfo>> {
        return await customAxios.post(`/customer-statuses/${id}`);
    }
}

export const customerStatusesService = new CustomerStatusesService();

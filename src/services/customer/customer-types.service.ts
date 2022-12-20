import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICustomerTypesInfo } from '../../types/services/clients.type';

class CustomerTypesService {
    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/customer-settings?type=type');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/customer-types/${id}`);
    }
}

export const customerTypesService = new CustomerTypesService();

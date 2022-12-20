import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';

class EquipmentOrdersService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/equipment-orders', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/equipment-orders');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/equipment-orders/${id}`);
    }
    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/equipment-orders/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/equipment-orders/${id}`);
    }
}

export const equipmentOrdersService = new EquipmentOrdersService();

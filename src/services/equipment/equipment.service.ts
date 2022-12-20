import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';

class EquipmentService {
    public async create(
        data: any,
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post('/equipments', data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/equipments');
    }

    public async getById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/equipments/${id}`);
    }
    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/equipments/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/equipments/${id}`);
    }
}

export const equipmentService = new EquipmentService();


import { AxiosResponse } from 'axios';
import axios from "axios";
import { customAxios } from '../../plugins/axios';

class WarehouseAttachmentService {
    public async create(
        data: any,
    ) {
        console.log('sub', data, data.data)
        return await customAxios.post(`/warehouse-attachments/?vehicle=${data.customerId}&customFileName=${data.customFileName}&createdBy=${data.createdBy}`, data.data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/warehouse-attachments');
    }

    public async getAllWriteOff(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/writeoff-attachments');
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        console.log('submit data', data)
        return await customAxios.put(`/warehouse-attachments/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/warehouse-attachments/${id}`);
    }
}

export const warehouseAttachmentService = new WarehouseAttachmentService();

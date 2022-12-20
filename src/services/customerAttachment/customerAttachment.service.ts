import { AxiosResponse } from 'axios';
import axios from "axios";
import { customAxios } from '../../plugins/axios';
import { ICreateEmployeeRole, IEmployeeRole, IUpdateEmployeeRole } from '../../types/services/employees.types';

class CustomerAttachmentService {
    public async create(
        data: any,
    ) {
        console.log('sub', data, data.data)
        return await customAxios.post(`/customer-attachments/?customerId=${data.customerId}&customFileName=${data.customFileName}&createdBy=${data.createdBy}`, data.data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/customer-attachments');
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        console.log('submit data', data)
        return await customAxios.put(`/customer-attachments/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/customer-attachments/${id}`);
    }
}

export const customerAttachmentService = new CustomerAttachmentService();

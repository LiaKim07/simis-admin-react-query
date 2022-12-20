
import { AxiosResponse } from 'axios';
import axios from "axios";
import { customAxios } from '../../plugins/axios';

class EmployeeAttachmentService {
    public async create(
        data: any,
    ) {
        console.log('sub', data, data.data)
        return await customAxios.post(`/employee-attachments/?vehicle=${data.customerId}&customFileName=${data.customFileName}&createdBy=${data.createdBy}`, data.data);
    }

    public async getAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get('/employee-attachments');
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        console.log('submit data', data)
        return await customAxios.put(`/employee-attachments/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/employee-attachments/${id}`);
    }
}

export const employeeAttachmentService = new EmployeeAttachmentService();

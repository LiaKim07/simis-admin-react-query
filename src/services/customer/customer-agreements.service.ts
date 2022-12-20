import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateCustomerAgreement, IUpdateCustomerAgreements } from "../../types/interface";
import {
    CustomerAgreement
} from "../../types/services/clients.type";

class CustomerAgreementsService {
    public async create(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/customer-agreements`, data);
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/customer-agreements/${data.id}`, data);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/customer-agreements");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/customer-agreements/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/customer-agreements/${id}`);
    }
}

export const customerAgreementsService = new CustomerAgreementsService();

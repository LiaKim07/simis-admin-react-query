import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateClient, IUpdateClients } from "../../types/interface";
import {
    ClientsDto
} from "../../types/services/clients.type";

class ClientsService {
    public async create(
        product: ICreateClient
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/customers`, product);
    }

    public async update(
        product: IUpdateClients
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/customers/${product.id}`, product);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/customers");
    }

    public async fetchCustomerByProjectOrderId(data: any): Promise<AxiosResponse<any>> {
        return await customAxios.get(`customers/${data?.customerId}/validate-order/${data?.projectOrderId}`);
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/customers/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/customers/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/customers/${id}`);
    }
}

export const clientsService = new ClientsService();

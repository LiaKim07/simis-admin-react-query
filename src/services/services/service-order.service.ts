import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateServices, IUpdateServices } from "../../types/interface";
import { ServicesDto } from "../../types/services/services.types";

class ServiceOrderService {
    public async create(
        services: ICreateServices
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/service-orders`, services);
    }

    public async update(
        services: any
    ): Promise<AxiosResponse<ServicesDto>> {
        return await customAxios.put(`/service-orders/${services.id}`, services);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/service-orders");
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/service-orders/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/service-orders/${id}`);
    }
}

export const serviceOrderService = new ServiceOrderService();

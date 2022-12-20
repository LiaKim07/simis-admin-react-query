import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateServices, IUpdateServices } from "../../types/interface";
import { ServicesDto } from "../../types/services/services.types";

class ServicesService {
    public async create(
        services: ICreateServices
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/services`, services);
    }

    public async update(
        services: IUpdateServices
    ): Promise<AxiosResponse<ServicesDto>> {
        return await customAxios.put(`/services/${services.id}`, services);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/services");
    }

    public async getservices() {
        return await customAxios.get(`/services/lookups`);
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/services/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/services/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/services/${id}`);
    }
}

export const servicesService = new ServicesService();

import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateServices, IUpdateServices } from "../../types/interface";
import { ServicesDto } from "../../types/services/services.types";

class ServiceCategoryService {
    public async create(
        services: ICreateServices
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/service-categories`, services);
    }

    public async update(
        services: IUpdateServices
    ): Promise<AxiosResponse<ServicesDto>> {
        return await customAxios.put(`/service-categories/${services.id}`, services);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/service-categories");
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/service-categories/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/service-categories/${id}`);
    }
}

export const serviceCategoryService = new ServiceCategoryService();

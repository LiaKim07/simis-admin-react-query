import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateServices, IUpdateServices } from "../../types/interface";
import { ServicesDto } from "../../types/services/services.types";

class ServiceSubCategoryService {
    public async create(
        services: ICreateServices
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/service-subcategories`, services);
    }

    public async update(
        services: IUpdateServices
    ): Promise<AxiosResponse<ServicesDto>> {
        return await customAxios.put(`/service-subcategories/${services.id}`, services);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/service-subcategories");
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/service-subcategories/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/service-subcategories/${id}`);
    }
}

export const serviceSubCategoryService = new ServiceSubCategoryService();

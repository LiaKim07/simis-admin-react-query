import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateProject, IUpdateProject } from "../../types/interface";
import { ProjectDto } from "../../types/services/project.types";

class ProjectOrdersService {
    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/project-orders");
    }

    public async fetchAllProjectReturn(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/project-orders?type=returns");
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/project-orders/${id}`);
    }

    public async fetchByIdLatest(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/project-orders/project=${id}/latest-rent-return-order`);
    }

    public async fetchByIdLatestSale(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/project-orders/project=${id}/latest-sales-order`);
    }

    public async fetchByIdLastThree(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/project-orders/project=${id}/three-latest`);
    }

    public async fetchUninvoicedById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/project-orders/project=${id}/uninvoiced`);
    }

    public async create(
        project: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/project-orders`, project);
    }

    public async update(
        data: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/project-orders/${data.id}`, data);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/project-orders/${id}`);
    }
}

export const projectOrdersService = new ProjectOrdersService();
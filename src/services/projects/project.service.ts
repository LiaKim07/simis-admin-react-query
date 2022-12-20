import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateProject, IUpdateProject } from "../../types/interface";
import { ProjectDto } from "../../types/services/project.types";

class ProjectService {
    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/projects");
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/projects/${id}`);
    }

    public async create(
        project: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/projects`, project);
    }

    public async update(
        project: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/projects/${project.id}`, project);
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/projects/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/projects/${id}`);
    }
}

export const projectService = new ProjectService();
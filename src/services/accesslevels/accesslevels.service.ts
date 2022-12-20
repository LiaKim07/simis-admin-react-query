import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateEmployee, IUpdateEmployee } from "../../types/interface";
import { EmployeeDto } from "../../types/services/employees.types";

class AccessLevelsService {
    public async create(
        accessLevelData: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/access-levels`, accessLevelData);
    }

    public async update(
        accessLevelData: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/access-levels/${accessLevelData.id}`, accessLevelData);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/access-levels");
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/access-levels/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/access-levels/${id}`);
    }
}

export const accessLevelsService = new AccessLevelsService();

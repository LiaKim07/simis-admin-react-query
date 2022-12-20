import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateVehicles, IUpdateVehicles } from "../../types/interface";
import {
    VehiclesDto,
} from "../../types/services/vehicles.type";

class VehiclesService {
    public async create(
        vehicles: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/vehicles`, vehicles);
    }

    public async update(
        vehicles: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/vehicles/${vehicles.id}`, vehicles);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/vehicles");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/vehicles/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/vehicles/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/vehicles/${id}`);
    }
}

export const vehiclesService = new VehiclesService();

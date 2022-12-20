import { useMutation, useQuery } from "react-query";
import { vehiclesService } from "../services/vehicles/vehicles.service";

class VehiclesStore {
    getAll() {
        return useQuery(["vehicles"], () => vehiclesService.fetchAll());
    }

    create() {
        return useMutation(vehiclesService.create);
    }

    update() {
        return useMutation(vehiclesService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["vehiclesById", id],
            () => vehiclesService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(vehiclesService.removeById);
    }
}

export const vehiclesStore = new VehiclesStore();

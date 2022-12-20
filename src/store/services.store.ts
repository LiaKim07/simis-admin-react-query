import { useMutation, useQuery } from "react-query";
import { servicesService } from "../services/services/services.service";

class ServicesStore {
    getAll() {
        return useQuery(["services"], () => servicesService.fetchAll());
    }

    create() {
        return useMutation(servicesService.create);
    }

    update() {
        return useMutation(servicesService.update);
    }

    removeById() {
        return useMutation(servicesService.removeById);
    }

    getServices() {
        return useQuery(["getservices"], () => servicesService.getservices());
    }

    getById(id?: string) {
        return useQuery(
            ["servicesById", id],
            () => servicesService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }
}

export const servicesStore = new ServicesStore();

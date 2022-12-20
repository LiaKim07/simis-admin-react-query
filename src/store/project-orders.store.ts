import { useMutation, useQuery } from "react-query";
import { projectOrdersService } from "../services/projects/project-orders.service";

class ProjectsOrdersStore {
    getAll() {
        return useQuery(["project-orders"], () => projectOrdersService.fetchAll());
    }

    getAllProjectReturn() {
        return useQuery(["project-orders-return"], () => projectOrdersService.fetchAllProjectReturn());
    }

    create() {
        return useMutation(projectOrdersService.create);
    }

    update() {
        return useMutation(projectOrdersService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["project-ordersById", id],
            () => projectOrdersService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    getByIdLatest(id?: string) {
        return useQuery(
            ["project-ordersLatestById", id],
            () => projectOrdersService.fetchByIdLatest(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    getByIdLatestSale(id?: string) {
        return useQuery(
            ["project-ordersLatestByIdSale", id],
            () => projectOrdersService.fetchByIdLatestSale(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    getLastThree(id?: string) {
        return useQuery(
            ["project-lastthree", id],
            () => projectOrdersService.fetchByIdLastThree(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    getUninvoicedById(id?: string) {
        return useQuery(
            ["project-uninvoiced-ordersById", id],
            () => projectOrdersService.fetchUninvoicedById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(projectOrdersService.removeById);
    }
}

export const projectsOrdersStore = new ProjectsOrdersStore();
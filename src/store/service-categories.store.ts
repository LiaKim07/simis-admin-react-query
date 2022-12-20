import { useMutation, useQuery } from "react-query";
import { serviceCategoryService } from "../services/services/service-categories.service";

class ServiceCategory {
    getAll() {
        return useQuery(["servicesCategories"], () => serviceCategoryService.fetchAll());
    }

    create() {
        return useMutation(serviceCategoryService.create);
    }

    update() {
        return useMutation(serviceCategoryService.update);
    }

    removeById() {
        return useMutation(serviceCategoryService.removeById);
    }

    getById(id?: string) {
        return useQuery(
            ["servicesCategoriesById", id],
            () => serviceCategoryService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }
}

export const serviceCategory = new ServiceCategory();

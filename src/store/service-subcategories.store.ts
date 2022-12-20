import { useMutation, useQuery } from "react-query";
import { serviceSubCategoryService } from "../services/services/service-subcategories.service";

class ServiceSubCategory {
    getAll() {
        return useQuery(["servicesSubCategories"], () => serviceSubCategoryService.fetchAll());
    }

    create() {
        return useMutation(serviceSubCategoryService.create);
    }

    update() {
        return useMutation(serviceSubCategoryService.update);
    }

    removeById() {
        return useMutation(serviceSubCategoryService.removeById);
    }

    getById(id?: string) {
        return useQuery(
            ["servicesSubCategoriesById", id],
            () => serviceSubCategoryService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }
}

export const serviceSubCategory = new ServiceSubCategory();

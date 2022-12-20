import { useMutation, useQuery } from "react-query";
import { productGroupService } from "../services/productsetting/productgroup-service";

class ProductGroup {
    getAll() {
        return useQuery(["productgroups"], () => productGroupService.fetchAll());
    }

    createProduct() {
        return useMutation(productGroupService.create);
    }

    updateProductgroup() {
        return useMutation(productGroupService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["productgroupById", id],
            () => productGroupService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(productGroupService.removeById);
    }
}

export const productGroup = new ProductGroup();

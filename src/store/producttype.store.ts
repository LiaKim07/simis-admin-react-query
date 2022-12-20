import { useMutation, useQuery } from "react-query";
import { productTypeService } from "../services/productsetting/producttype-service";

class ProductType {
    getAll() {
        return useQuery(["producttypes"], () => productTypeService.fetchAll());
    }

    createProduct() {
        return useMutation(productTypeService.create);
    }

    updateProducttype() {
        return useMutation(productTypeService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["productypetById", id],
            () => productTypeService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(productTypeService.removeById);
    }
}

export const productType = new ProductType();

import { useMutation, useQuery } from "react-query";
import { productService } from "../services/products/product.service";

class ProductStore {
    getAll() {
        return useQuery(["products"], () => productService.fetchAll());
    }

    createProduct() {
        return useMutation(productService.create);
    }

    updateProduct() {
        return useMutation(productService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["productById", id],
            () => productService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(productService.removeById);
    }
}

export const productStore = new ProductStore();

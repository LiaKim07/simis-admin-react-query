import { useMutation, useQuery } from "react-query";
import { productCategoryService } from "../services/productsetting/productcategory.service";

class ProductCategory {
    getAll() {
        return useQuery(["productcategories"], () => productCategoryService.fetchAll());
    }

    createProduct() {
        return useMutation(productCategoryService.create);
    }

    updateProductcategory() {
        return useMutation(productCategoryService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["productcategoryById", id],
            () => productCategoryService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(productCategoryService.removeById);
    }
}

export const productCategory = new ProductCategory();

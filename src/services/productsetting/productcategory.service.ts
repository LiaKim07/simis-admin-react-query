import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateProductCategory, IUpdateProductCategory } from "../../types/interface";
import {
    ProductCategoryDto,
} from "../../types/services/productcategory.type";

class ProductCategoryService {
    public async create(
        product: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/product-categories`, product);
    }

    public async update(
        product: any
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/product-categories/${product.id}`, product);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/product-categories");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/product-categories/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/product-categories/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/product-categories/${id}`);
    }
}

export const productCategoryService = new ProductCategoryService();

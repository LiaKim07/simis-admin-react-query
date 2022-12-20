import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateProduct, IUpdateProduct } from "../../types/interface";
import {
    ProductDto,
} from "../../types/services/product.types";

class ProductService {
    public async create(
        product: ICreateProduct
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/products`, product);
    }

    public async update(
        product: IUpdateProduct
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/products/${product.id}`, product);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/products");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/products/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/products/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/products/${id}`);
    }
}

export const productService = new ProductService();

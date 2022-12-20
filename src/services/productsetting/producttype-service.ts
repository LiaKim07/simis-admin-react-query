import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateProducttype, IUpdateProductType } from "../../types/interface";
import {
    ProductTypeDto,
} from "../../types/services/producttype.type";

class ProductTypeService {
    public async create(
        product: ICreateProducttype
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/product-types`, product);
    }

    public async update(
        product: IUpdateProductType
    ): Promise<AxiosResponse<any>> {
        return await customAxios.put(`/product-types/${product.id}`, product);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/product-types");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/product-types/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/product-types/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/product-types/${id}`);
    }
}

export const productTypeService = new ProductTypeService();

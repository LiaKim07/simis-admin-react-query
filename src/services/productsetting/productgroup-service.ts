import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateProductGroup, IUpdateProductGroup } from "../../types/interface";
import {
    ProductGroupDto,
} from "../../types/services/productgroup.type";

class ProductGroupService {
    public async create(
        product: ICreateProductGroup
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/product-groups`, product);
    }

    public async update(
        product: IUpdateProductGroup
    ): Promise<AxiosResponse<ProductGroupDto>> {
        return await customAxios.put(`/product-groups/${product.id}`, product);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/product-groups");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/product-groups/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/product-groups/${id}`);
    }

    public async removeById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/product-groups/${id}`);
    }
}

export const productGroupService = new ProductGroupService();

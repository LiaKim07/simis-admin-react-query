import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateCustomerCategory, IUpdateCustomerCategories } from "../../types/interface";
import {
    CustomerCategories
} from "../../types/services/clients.type";

class CustomerCategoriesService {
    public async create(
        product: ICreateCustomerCategory
    ): Promise<AxiosResponse<CustomerCategories>> {
        return await customAxios.post(`/customers/categories`, product);
    }

    public async update(
        product: IUpdateCustomerCategories
    ): Promise<AxiosResponse<CustomerCategories>> {
        return await customAxios.put(`/customers/categories/${product.id}`, product);
    }

    public async fetchAll(): Promise<AxiosResponse<[CustomerCategories]>> {
        return await customAxios.get("/customers/categories");
    }

    public async remove(id: string): Promise<AxiosResponse<CustomerCategories>> {
        return await customAxios.delete(`/customers/categories/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<CustomerCategories>> {
        return await customAxios.get(`/customers/categories/${id}`);
    }
}

export const customerCategoriesService = new CustomerCategoriesService();

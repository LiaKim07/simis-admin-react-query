import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateCustomerContacts, IUpdateCustomerContacts } from "../../types/interface";
import {
    CustomerContact
} from "../../types/services/clients.type";

class CustomerContactService {
    public async create(
        data: ICreateCustomerContacts
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/customer-contacts`, data);
    }

    public async update(
        data: IUpdateCustomerContacts
    ): Promise<AxiosResponse<CustomerContact>> {
        return await customAxios.put(`/customer-contacts/${data.id}`, data);
    }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/customer-contacts");
    }

    public async remove(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.delete(`/customer-contacts/${id}`);
    }

    public async fetchById(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/customer-contacts/${id}`);
    }

    public async fetchByCustomerId(id: string): Promise<AxiosResponse<any>> {
        return await customAxios.get(`/customer-contacts/customer?customerId=${id}`);
    }
}

export const customerContactService = new CustomerContactService();

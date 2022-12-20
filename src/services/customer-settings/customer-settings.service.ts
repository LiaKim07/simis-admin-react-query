import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateClient, IUpdateClients } from "../../types/interface";
import {
    ClientsDto
} from "../../types/services/clients.type";

class CustomerSettingsService {
    public async create(
        product: ICreateClient
    ): Promise<AxiosResponse<any>> {
        return await customAxios.post(`/customers`, product);
    }

    // public async update(
    //     product: IUpdateClients
    // ): Promise<AxiosResponse<any>> {
    //     return await customAxios.put(`/customers/${product.id}`, product);
    // }

    public async fetchAll(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/customer-settings");
    }

    public async fetchType(): Promise<AxiosResponse<any>> {
        return await customAxios.get("/customer-settings?type=type");
    }

    public async fetchStatus() {
        return await customAxios.get("/customer-settings?type=status");
    }

    public async fetchSolvency() {
        return await customAxios.get("/customer-settings?type=solvency");
    }

    public async fetchPaymentMethod() {
        return await customAxios.get("/customer-settings?type=paymentMethod");
    }

    public async fetchAgreementTerm() {
        return await customAxios.get("/customer-settings?type=agreementTerminationTerm");
    }

    public async fetchCustomerPaymentDueTerm() {
        return await customAxios.get("/customer-settings?type=customerPaymentDueTerm");
    }
    // public async remove(id: string): Promise<AxiosResponse<any>> {
    //     return await customAxios.delete(`/customers/${id}`);
    // }

    // public async fetchById(id: string): Promise<AxiosResponse<any>> {
    //     return await customAxios.get(`/customers/${id}`);
    // }

    // public async removeById(id: string): Promise<AxiosResponse<any>> {
    //     return await customAxios.delete(`/customers/${id}`);
    // }
}

export const customerSettingsService = new CustomerSettingsService();

import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";

class InvoiceService {
  public async create(data: any): Promise<AxiosResponse<any>> {
    return await customAxios.post("/invoices", data);
  }

  public async getAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/invoices");
  }

  public async getById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/invoices/${id}`);
  }
  public async update(data: any): Promise<AxiosResponse<any>> {
    return await customAxios.put(`/invoices/${data.id}`, data);
  }

  public async removeById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/invoices/${id}`);
  }

  public async sendEmail(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.post(`/invoices/${id}/send-email`);
  }

  public async getExternalById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/invoices/${id}/view`);
  }
}

export const invoiceServiece = new InvoiceService();

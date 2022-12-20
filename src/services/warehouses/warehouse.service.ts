import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateWarehouse, IUpdateWarehouse } from "../../types/interface";
import {
  WarehouseDto,
} from "../../types/services/warehouse.types";

class WarehouseService {
  public async create(
    warehouse: ICreateWarehouse
  ): Promise<AxiosResponse<any>> {
    return await customAxios.post(`/warehouses`, warehouse);
  }

  public async addProduct(
    postdata: any
  ) {
    return await customAxios.post(`/warehouse-products`, postdata);
  }

  public async update(
    warehouse: IUpdateWarehouse
  ): Promise<AxiosResponse<any>> {
    return await customAxios.put(`/warehouses/${warehouse.id}`, warehouse);
  }

  public async updateProduct(
    data: any
  ): Promise<AxiosResponse<any>> {
    return await customAxios.put(`/warehouse-products/${data.id}`, data);
  }

  public async fetchAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/warehouses");
  }

  public async fetchAllWarehouseProducts(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/warehouse-products");
  }

  public async fetchAllWarehouseProductsById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-products/${id}`);
  }

  public async fetchWarehouseOrdersById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-orders/project=${id}/current-loans`);
  }

  public async fetchAllWarehouseOrders(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/warehouse-orders");
  }

  public async fetchAllWarehouseOrdersReturn(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/warehouse-orders?type=returns");
  }

  public async fetchAllWarehouseOrdersSale(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/warehouse-orders?type=sales");
  }

  public async fetchWarehouseProductOrdersById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-orders/project=${id}`);
  }

  public async fetchWarehouseOrderRentAggregate(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-orders/projectorder=${id}/current-products-rent/aggregate`);
  }

  public async fetchWarehouseOrderSaleAggregate(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-orders/projectorder=${id}/current-products-sale/aggregate`);
  }

  public async fetchRentAggregate(rentData: any): Promise<AxiosResponse<any>> {
    let url: string = '/warehouse-orders/current-products-rent/aggregate';
    if (rentData && rentData.length > 0) {
      rentData.map((item: string, index: number) => {
        if (item.length > 0) {
          if (item && index === 0) {
            url = url + '?projectOrder=' + item + '&';
          } else if (item && index !== rentData.length - 1) {
            url = url + 'projectOrder=' + item + '&';
          } else {
            url = url + 'projectOrder=' + item;
          }
        }
      })
    }
    return await customAxios.get(`${url}`);
  }

  public async fetchCurrentSale(saleData: any): Promise<AxiosResponse<any>> {
    let url: string = '/warehouse-orders/current-products-sale';
    if (saleData.length > 0) {
      saleData.map((item: string, index: number) => {
        if (index === 0) {
          url = url + '?projectOrder=' + item + '&';
        } else if (index !== saleData.length - 1) {
          url = url + 'projectOrder=' + item + '&';
        } else {
          url = url + 'projectOrder=' + item;
        }
      })
    }
    return await customAxios.get(`${url}`);
  }

  public async fetchCurrentService(serviceData: any): Promise<AxiosResponse<any>> {
    let url: string = '/service-orders/current-services';
    if (serviceData.length > 0) {
      serviceData.map((item: string, index: number) => {
        if (index === 0) {
          url = url + '?projectOrder=' + item + '&';
        } else if (index !== serviceData.length - 1) {
          url = url + 'projectOrder=' + item + '&';
        } else {
          url = url + 'projectOrder=' + item;
        }
      })
    }
    return await customAxios.get(`${url}`);
  }

  public async fetchWarehouseProductOrdersByProjectOrderIdRent(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-orders/projectorder=${id}/current-products-rent`);
  }

  public async fetchSaleAggregate(saleData: any): Promise<AxiosResponse<any>> {
    let url: string = 'warehouse-orders/current-products-sale/aggregate';
    if (saleData.length > 0) {
      saleData.map((item: string, index: number) => {
        if (index === 0) {
          url = url + '?projectOrder=' + item + '&';
        } else if (index !== saleData.length - 1) {
          url = url + 'projectOrder=' + item + '&';
        } else {
          url = url + 'projectOrder=' + item;
        }
      })
    }
    return await customAxios.get(`${url}`);
  }

  public async fetchWarehouseProductOrdersByProjectOrderIdSale(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouse-orders/projectorder=${id}/current-products-sale`);
  }

  public async createWarehouseOrder(
    postdata: any
  ) {
    return await customAxios.post(`/warehouse-orders`, postdata);
  }

  public async updateWarehouseOrder(
    warehouse: any
  ): Promise<AxiosResponse<any>> {
    return await customAxios.put(`/warehouse-orders/${warehouse.id}`, warehouse);
  }

  public async createWarehouseProducts(
    postdata: any
  ) {
    return await customAxios.post(`/warehouse-products`, postdata);
  }

  public async remove(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/warehouses/${id}`);
  }

  public async fetchById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouses/${id}`);
  }

  public async fetchproductById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/warehouses/${id}/products`);
  }

  public async removeById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/warehouses/${id}`);
  }

  public async removeWarehouseById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/warehouse-orders/${id}`);
  }
}

export const warehouseService = new WarehouseService();

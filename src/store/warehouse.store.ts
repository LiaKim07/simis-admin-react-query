import { useMutation, useQuery } from "react-query";

import { warehouseService } from "../services/warehouses/warehouse.service";

class WarehouseStore {
  getAll() {
    return useQuery(["warehouses"], () => warehouseService.fetchAll());
  }

  createWarehouse() {
    return useMutation(warehouseService.create);
  }

  getAllWarehosueProducts() {
    return useQuery(["warehouse-products"], () => warehouseService.fetchAllWarehouseProducts());
  }

  updateWarehouseProduct() {
    return useMutation(warehouseService.updateProduct);
  }

  getAllWarehosueProductsById(id?: string) {
    return useQuery(
      ["warehouse-productsById", id],
      () => warehouseService.fetchAllWarehouseProductsById(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  getAllWarehosueOrders() {
    return useQuery(["warehouse-orders"], () => warehouseService.fetchAllWarehouseOrders());
  }

  getAllWarehosueOrdersReturn() {
    return useQuery(["warehouse-ordersReturn"], () => warehouseService.fetchAllWarehouseOrdersReturn());
  }

  getAllWarehosueOrdersSale() {
    return useQuery(["warehouse-ordersSale"], () => warehouseService.fetchAllWarehouseOrdersSale());
  }

  getWarehosueOrdersById(id?: string) {
    return useQuery(
      ["warehouse-ordersById", id],
      () => warehouseService.fetchWarehouseOrdersById(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  getWarehosueProductOrdersById(id?: string) {
    return useQuery(
      ["warehouse-product-ordersById", id],
      () => warehouseService.fetchWarehouseProductOrdersById(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  getWarehosueProductOrdersByProjectOrderIdRent(id?: string) {
    return useQuery(
      ["warehouse-product-ordersByProjectOrderId", id],
      () => warehouseService.fetchWarehouseProductOrdersByProjectOrderIdRent(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  getWarehosueProductOrdersRentAggregate(data?: any) {
    return useQuery(
      ["loanAggregate", data],
      () => warehouseService.fetchWarehouseOrderRentAggregate(data || ""),
      {
        enabled: !!data,
      }
    );
  }

  getWarehosueProductOrdersSaleAggregate(data?: any) {
    return useQuery(
      ["saleAggregate", data],
      () => warehouseService.fetchWarehouseOrderSaleAggregate(data || ""),
      {
        enabled: !!data,
      }
    );
  }

  getWarehosueProductOrdersByRentAggregate(data?: any) {
    return useQuery(
      ["loans", data],
      () => warehouseService.fetchRentAggregate(data || ""),
      {
        enabled: !!data,
      }
    );
  }

  getCurrentSale(data?: any) {
    return useQuery(
      ["sale", data],
      () => warehouseService.fetchCurrentSale(data || ""),
      {
        enabled: !!data,
      }
    );
  }

  getCurrentService(data?: any) {
    return useQuery(
      ["service", data],
      () => warehouseService.fetchCurrentService(data || ""),
      {
        enabled: !!data,
      }
    );
  }

  // getWarehosueProductOrdersByRentAggregate() {
  //   return useMutation(warehouseService.fetchRentAggregate);
  // }

  getWarehosueProductOrdersBySaleAggregate(data?: any) {
    return useQuery(
      ["loan", data],
      () => warehouseService.fetchSaleAggregate(data || ""),
      {
        enabled: !!data,
      }
    );
  }

  // getWarehosueProductOrdersBySaleAggregate() {
  //   return useMutation(warehouseService.fetchSaleAggregate);
  // }

  getWarehosueProductOrdersByProjectOrderIdSale(id?: string) {
    return useQuery(
      ["warehouse-product-ordersByProjectOrderId", id],
      () => warehouseService.fetchWarehouseProductOrdersByProjectOrderIdSale(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  createWarehouseOrder() {
    return useMutation(warehouseService.createWarehouseOrder);
  }

  updateWarehouseOrder() {
    return useMutation(warehouseService.updateWarehouseOrder);
  }

  createWarehouseProducts() {
    return useMutation(warehouseService.createWarehouseProducts);
  }

  createProductToWarehouse() {
    return useMutation(warehouseService.addProduct);
  }

  updateWarehouse() {
    return useMutation(warehouseService.update);
  }

  getById(id?: string) {
    return useQuery(
      ["warehouseById", id],
      () => warehouseService.fetchById(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  getproductById(id?: string) {
    return useQuery(
      ["getproductById", id],
      () => warehouseService.fetchproductById(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  removeById() {
    return useMutation(warehouseService.removeById);
  }

  removeWarehouseOrderById() {
    return useMutation(warehouseService.removeWarehouseById);
  }
}

export const warehouseStore = new WarehouseStore();

import { useMutation, useQuery } from "react-query";

import { invoiceServiece } from "../services/invoice/invoice.service";

class InvoiceStore {
  create() {
    return useMutation(invoiceServiece.create);
  }

  getAll() {
    return useQuery(["invoice"], () => invoiceServiece.getAll());
  }

  getById(id?: string) {
    return useQuery(
      ["invoiceById", id],
      () => invoiceServiece.getById(id || ""),
      {
        enabled: !!id,
      }
    );
  }

  update() {
    return useMutation(invoiceServiece.update);
  }

  removeById() {
    return useMutation(invoiceServiece.removeById);
  }

  sendEmail() {
    return useMutation(invoiceServiece.sendEmail);
  }

  getExternalById(id?: string) {
    return useQuery(
      ["invoide", id],
      () => invoiceServiece.getExternalById(id || ""),
      {
        enabled: !!id,
      }
    );
  }
}

export const invoiceStore = new InvoiceStore();

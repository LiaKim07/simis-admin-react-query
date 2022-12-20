import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateEmployee, IUpdateEmployee } from "../../types/interface";
import { EmployeeDto } from "../../types/services/employees.types";

class EmployeeService {
  public async create(
    employee: ICreateEmployee
  ): Promise<AxiosResponse<any>> {
    return await customAxios.post(`/employees`, employee);
  }

  public async update(
    employee: IUpdateEmployee
  ): Promise<AxiosResponse<any>> {
    return await customAxios.put(`/employees/${employee.id}`, employee);
  }

  public async fetchAll(): Promise<AxiosResponse<any>> {
    return await customAxios.get("/employees");
  }

  public async fetchById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.get(`/employees/${id}`);
  }

  public async getemp() {
    return await customAxios.get(`/employees/lookups`);
  }

  public async removeById(id: string): Promise<AxiosResponse<any>> {
    return await customAxios.delete(`/employees/${id}`);
  }
}

export const employeeService = new EmployeeService();

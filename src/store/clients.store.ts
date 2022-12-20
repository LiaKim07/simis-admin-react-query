import { useMutation, useQuery } from "react-query";
import { clientsService } from "../services/clients/clients.service";

class ClientsStore {
    getAll() {
        return useQuery(["clients"], () => clientsService.fetchAll());
    }

    getCustomerByProjectOrder(data?: any) {
        return useQuery(
            ["getCustomerByProjectOrderId", data],
            () => clientsService.fetchCustomerByProjectOrderId(data || ""),
            {
                enabled: !!data,
            }
        );
    }

    createClients() {
        return useMutation(clientsService.create);
    }

    updateClients() {
        return useMutation(clientsService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["clientById", id],
            () => clientsService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(clientsService.removeById);
    }
}

export const clientsStore = new ClientsStore();

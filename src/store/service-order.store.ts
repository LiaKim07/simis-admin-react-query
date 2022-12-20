import { useMutation, useQuery } from "react-query";
import { serviceOrderService } from "../services/services/service-order.service";

class ServiceOrder {
    getAll() {
        return useQuery(["servicesOrder"], () => serviceOrderService.fetchAll());
    }

    create() {
        return useMutation(serviceOrderService.create);
    }

    update() {
        return useMutation(serviceOrderService.update);
    }

    removeById() {
        return useMutation(serviceOrderService.removeById);
    }

    getById(id?: string) {
        return useQuery(
            ["servicesOrderById", id],
            () => serviceOrderService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }
}

export const serviceOrder = new ServiceOrder();

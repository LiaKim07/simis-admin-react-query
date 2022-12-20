import { useMutation, useQuery } from 'react-query';

import { ecommreceOrderService } from '../services/ecommrece-client/ecommerce-order.service';

class EcommerceOrderStore {
    getAll() {
        return useQuery(['ecommerce-order'], () => ecommreceOrderService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['ecommerce-order-byId', id],
            () => ecommreceOrderService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(ecommreceOrderService.update);
    }

    removeById() {
        return useMutation(ecommreceOrderService.removeById);
    }
}

export const ecommerceOrderStore = new EcommerceOrderStore();

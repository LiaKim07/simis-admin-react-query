import { useMutation, useQuery } from 'react-query';

import { ecommreceClientService } from '../services/ecommrece-client/ecommerce-client.service';

class EcommerceClientStore {
    getAll() {
        return useQuery(['ecommerce-client'], () => ecommreceClientService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['ecommerce-client-byId', id],
            () => ecommreceClientService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(ecommreceClientService.update);
    }

    removeById() {
        return useMutation(ecommreceClientService.removeById);
    }
}

export const ecommerceClientStore = new EcommerceClientStore();

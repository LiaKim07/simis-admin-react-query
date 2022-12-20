import { useMutation, useQuery } from 'react-query';

import { equipmentOrdersService } from '../services/equipment/equipment-order.service';

class EquipmentOrderStore {
    create() {
        return useMutation(equipmentOrdersService.create);
    }

    getAll() {
        return useQuery(['equipmentOrder'], () => equipmentOrdersService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['equipmentOrderById', id],
            () => equipmentOrdersService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(equipmentOrdersService.update);
    }

    removeById() {
        return useMutation(equipmentOrdersService.removeById);
    }
}

export const equipmentOrderStore = new EquipmentOrderStore();

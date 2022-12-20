import { useMutation, useQuery } from 'react-query';

import { equipmentService } from '../services/equipment/equipment.service';

class EquipmentStore {
    create() {
        return useMutation(equipmentService.create);
    }

    getAll() {
        return useQuery(['equipments'], () => equipmentService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['equipmentsById', id],
            () => equipmentService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(equipmentService.update);
    }

    removeById() {
        return useMutation(equipmentService.removeById);
    }
}

export const equipmentStore = new EquipmentStore();

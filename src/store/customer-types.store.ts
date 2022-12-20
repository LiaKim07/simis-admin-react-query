import { useQuery } from 'react-query';

import { customerTypesService } from '../services/customer/customer-types.service';

class CustomertypesStore {
    getAll() {
        return useQuery(['customertypes'], () => customerTypesService.getAll());
    }
    getById(id?: string) {
        return useQuery(['customertypesById', id], () => customerTypesService.getById(id || ''), {
            enabled: !!id,
        });
    }
}

export const customertypesStore = new CustomertypesStore();

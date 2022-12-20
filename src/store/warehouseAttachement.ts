import { useMutation, useQuery } from 'react-query';

import { warehouseAttachmentService } from '../services/warehouses/warehouseAttachment.service';

class WarehouseAttachmentStore {
    create() {
        return useMutation(warehouseAttachmentService.create);
    }

    getAll() {
        return useQuery(['warehouseAttachment'], () => warehouseAttachmentService.getAll());
    }
    
    getAllWriteoff() {
        return useQuery(['warehouseWriteoffAttachment'], () => warehouseAttachmentService.getAllWriteOff());
    }

    // getById(id?: string) {
    //     return useQuery(
    //         ['company-contractsId', id],
    //         () => companyContractService.getById(id || ''),
    //         {
    //             enabled: !!id,
    //         },
    //     );
    // }

    update() {
        return useMutation(warehouseAttachmentService.update);
    }

    removeById() {
        return useMutation(warehouseAttachmentService.removeById);
    }
}

export const warehouseAttachmentStore = new WarehouseAttachmentStore();

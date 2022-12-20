import { useMutation, useQuery } from 'react-query';

import { vehicleAttachmentService } from '../services/vehicles/vehicleAttachment.service';

class VehicleAttachmentStore {
    create() {
        return useMutation(vehicleAttachmentService.create);
    }

    getAll() {
        return useQuery(['vehicleAttachment'], () => vehicleAttachmentService.getAll());
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
        return useMutation(vehicleAttachmentService.update);
    }

    removeById() {
        return useMutation(vehicleAttachmentService.removeById);
    }
}

export const vehicleAttachmentStore = new VehicleAttachmentStore();

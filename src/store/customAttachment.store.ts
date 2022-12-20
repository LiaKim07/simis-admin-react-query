import { useMutation, useQuery } from 'react-query';

import { customerAttachmentService } from '../services/customerAttachment/customerAttachment.service';

class CustomAttachmentStore {
    create() {
        return useMutation(customerAttachmentService.create);
    }

    getAll() {
        return useQuery(['customerAttachment'], () => customerAttachmentService.getAll());
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
        return useMutation(customerAttachmentService.update);
    }

    removeById() {
        return useMutation(customerAttachmentService.removeById);
    }
}

export const customAttachmentStore = new CustomAttachmentStore();

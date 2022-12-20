import { useMutation, useQuery } from 'react-query';

import { agreementClausesService } from '../services/agreement-clauses/agreement-clauses.service';

class AgreementClausesStore {
    create() {
        return useMutation(agreementClausesService.create);
    }

    getAll() {
        return useQuery(['agreement-clauses'], () => agreementClausesService.getAll());
    }

    getById(id?: string) {
        return useQuery(
            ['agreement-clausesById', id],
            () => agreementClausesService.getById(id || ''),
            {
                enabled: !!id,
            },
        );
    }

    update() {
        return useMutation(agreementClausesService.update);
    }

    removeById() {
        return useMutation(agreementClausesService.removeById);
    }
}

export const agreementClausesStore = new AgreementClausesStore();

import { useMutation, useQuery } from "react-query";
import { customerAgreementsService } from "../services/customer/customer-agreements.service";

class CustomerAgreements {
    getAll() {
        return useQuery(["agreement"], () => customerAgreementsService.fetchAll());
    }

    createCutomerAgreements() {
        return useMutation(customerAgreementsService.create);
    }

    updateCutomerAgreements() {
        return useMutation(customerAgreementsService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["agreementById", id],
            () => customerAgreementsService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }
}

export const customerAgreements = new CustomerAgreements();

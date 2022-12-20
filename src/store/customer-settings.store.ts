import { useMutation, useQuery } from "react-query";
import { customerSettingsService } from "../services/customer-settings/customer-settings.service";

class CustomerSettings {
    fetchAll() {
        return useQuery(["customerSettingsStatus"], () => customerSettingsService.fetchAll());
    }

    fetchStatus() {
        return useQuery(["customerSettingsStatus"], () => customerSettingsService.fetchStatus());
    }

    fetchType() {
        return useQuery(["customerSettingsType"], () => customerSettingsService.fetchType());
    }

    fetchSolvency() {
        return useQuery(["customerSettingsSolvency"], () => customerSettingsService.fetchSolvency());
    }

    fetchPaymentMethod() {
        return useQuery(["customerSettingsPaymentmethod"], () => customerSettingsService.fetchPaymentMethod());
    }

    fetchAgreementTerm() {
        return useQuery(["customerSettingsAgreementTerm"], () => customerSettingsService.fetchAgreementTerm());
    }

    fetchCustomerPaymentDueTerm() {
        return useQuery(["customerSettingsAgreementTerm"], () => customerSettingsService.fetchCustomerPaymentDueTerm());
    }

    create() {
        return useMutation(customerSettingsService.create);
    }

    // updateClients() {
    //     return useMutation(clientsService.update);
    // }

    // getById(id?: string) {
    //     return useQuery(
    //         ["clientsById", id],
    //         () => clientsService.fetchById(id || ""),
    //         {
    //             enabled: !!id,
    //         }
    //     );
    // }

    // removeById() {
    //     return useMutation(clientsService.removeById);
    // }
}

export const customerSettings = new CustomerSettings();
